(function(){
    'use strict';

  function TestRecorder() {
    console.log('[recorder.js] [TestRecorder] constructor');
    /* SSE listener */
    this._events = ["subtitle", /*"pushvod",*/ "pdl", "player", /*"eit",*/ "records", "cas", "prm", "network", "storage", "system", "scanning", "avio", "hls"/*, "respawn", "open", "error"*/];
    this.source = new window.EventSource('http://10.0.2.129/stream');
  }

  TestRecorder.prototype.init = function() {
    var self = this;
    console.log('[recorder.js] [TestRecorder] init');
    this._events.forEach(function(_event) {
        self.source.addEventListener(_event, function(e) {
          console.log('[recorder.js] [TestRecorder] event "'+_event+'" - '+ e.data);
      }, false);
    });

    /* Keyboard listeners */
    document.addEventListener('keyup', function (e) {
      console.log('[recorder.js] [TestRecorder] event keyup : ' + e.keyCode);
    });
  }

  function Hover() {
    this.currentElt = null;
    this.lastElt = null;
    this.bgColor = null;
  }
  Hover.prototype.getCurrentHoverElt = function() {
    var fullSelection = document.querySelectorAll( ":hover" );
    if( fullSelection.length > 1 ) {
      hover.currentElt = fullSelection[fullSelection.length-1];
      if( hover.currentElt !== hover.lastElt) {
        console.log('[recorder.js] [Hover] getCurrentHoverElt : ' + JSON.stringify(hover.currentElt));
        if( hover.lastElt ) {
          hover.lastElt.style.backgroundColor = hover.bgColor;
        }
        hover.bgColor = hover.currentElt.style.backgroundColor;
        hover.currentElt.style.backgroundColor = "#4DA1EA";
        hover.lastElt = hover.currentElt;
      }
    }
    hover.startMouseListen();
  };
  Hover.prototype.startMouseListen = function() {
    window.setTimeout(function() {
      hover.getCurrentHoverElt(true);
    }, 300);
  },
  Hover.prototype.init = function() {
    hover.startMouseListen();
  }
  var hover = new Hover();
  hover.init();

  var recorder = new TestRecorder();
  recorder.init();
})();