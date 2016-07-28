(function(){
  'use strict';

  function Background() {
    console.log('[background.js] [Background] constructor')
    this.testcase_items = new Array();
    this.active = false;
    this.empty = true;
    this.tab_id = null;
  }

    /**
    * Receive messages from content_script, and then decide what to do next
    */
  Background.prototype.addMessageListener = function() {
    console.log('[background.js] [Background] addMessageListener');
    var self = this;
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.action == 'append') {
        console.log('[background.js] [Background] onMessage: append');
        self.testcase_items[self.testcase_items.length] = request.obj;
        self.empty = false;
        sendResponse({});
      }
      if (request.action == 'get_status') {
        console.log('[background.js] [Background] onMessage: get_status');
        sendResponse({active: self.active, empty: self.empty});
      }
      if (request.action == 'stop') {
        console.log('[background.js] [Background] onMessage: stop');
        self.active = false;
        chrome.tabs.sendMessage(self.tab_id, {action: "stop"});
        sendResponse({});
      }
      if (request.action == 'get_items') {
        console.log('[background.js] [Background] onMessage: get_items');
        sendResponse({items: self.testcase_items});
      }
      if (request.action == 'get_status') {
        console.log('[background.js] [Background] onMessage: get_status');
        sendResponse({active: self.active, empty: self.empty});
      }
      if(request.action === 'start') {
        console.log('[background.js] [Background] onMessage: start');
        if(!self.active) {
  	      self.active = true;
  	      self.empty = true;
  	      self.testcase_items = new Array();
  	      self.tab_id = request.recorded_tab;
  	      chrome.tabs.update(self.tab_id, {url: request.start_url}, function(tab) {
            alert("You are now recording your test sequence.");
            chrome.tabs.sendMessage(self.tab_id, {action: "open", 'url': request.start_url});
            sendResponse({start: true});
  	      });
        }
      }
      else {
        sendResponse({msg: '[background] unknown message ' + request.action, data: null});
      }
    });
  }

  var bg = new Background()
  bg.addMessageListener();
})();