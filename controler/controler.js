(function(){
  'use strict';

  function RecorderProxy() {
    console.log('[controler.js] [RecorderProxy] constructor');
    this.active = null;
  }

  RecorderProxy.prototype.start = function(url) {
    console.log('[controler.js] [RecorderProxy] start : ' + url);
    chrome.tabs.getSelected(null, function(tab) {
      chrome.runtime.sendMessage({action: "start", recorded_tab: tab.id, start_url: url});
    });
  }


  function RecorderUI() {
    console.log('[controler.js] [RecorderUI] constructor');
    this.recorder = new RecorderProxy();
    chrome.runtime.sendMessage({action: "get_status"}, function(response) {
      if (response.active) {
        ui.set_started();
      } else {
        if (!response.empty) {
          ui.set_stopped();
        }
        chrome.tabs.getSelected(null, function(tab) {
          document.forms[0].elements["url"].value = tab.url;
        });
      }
    });
  }

  RecorderUI.prototype.start = function() {
    var url = document.forms[0].elements["url"].value;
    console.log('[controler.js] [RecorderUI] start : ' + url);
    if (url == "") {
        return false;
    }
    if ( (url.indexOf("http://") == -1) && (url.indexOf("https://")) ) {
        url = "http://" + url;
    }
    ui.set_started()
    ui.recorder.start(url);

    return false;
  }

  RecorderUI.prototype.set_started = function() {
    console.log('[controler.js] [RecorderUI] set_started');
    var e = document.getElementById("bstop");
    e.style.display = '';
    e.onclick = ui.stop;
    e.value = "Stop Recording";
    e = document.getElementById("bgo");
    e.style.display = 'none';
    e = document.getElementById("bexport");
    e.style.display = 'none';
  }

  RecorderUI.prototype.stop = function() {
    console.log('[controler.js] [RecorderUI] stop');
    ui.set_stopped();
    ui.recorder.stop();
    return false;
  }

  RecorderUI.prototype.set_stopped = function() {
    console.log('[controler.js] [RecorderUI] set_stopped');
    var e = document.getElementById("bstop");
    e.style.display = 'none';
    e = document.getElementById("bgo");
    e.style.display = '';
    e = document.getElementById("bexport");
    e.style.display = '';
  }

  var ui;

  // bind events to ui elements
  window.onload = function(){
    document.querySelector('input#bgo').onclick=function() {ui.start(); return false;};
    document.querySelector('input#bstop').onclick=function() {ui.stop(); return false;};
    document.querySelector('input#bexport').onclick=function() {ui.export(); return false;};
    ui = new RecorderUI();
  }

})();
