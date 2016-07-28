(function(){
    'use strict';

  function Recorder() {
    console.log('[recorder.js] [Recorder] constructor');
    /* SSE listener */
    this._events = ["subtitle", /*"pushvod",*/ "pdl", "player", /*"eit",*/ "records", "cas", "prm", "network", "storage", "system", "scanning", "avio", "hls"/*, "respawn", "open", "error"*/];
    this.source = new window.EventSource('http://10.0.2.129/stream');
  }

  Recorder.prototype.init = function() {
    var self = this;
    console.log('[recorder.js] [Recorder] init');
    this._events.forEach(function(_event) {
        self.source.addEventListener(_event, function(e) {
          console.log('[recorder.js] [Recorder] event "'+_event+'" - '+ e.data);
      }, false);
    });

    /* Keyboard listeners */
    document.addEventListener('keyup', function (e) {
      console.log('[recorder.js] [Recorder] event keyup : ' + e.keyCode);
    });
  }

  var recorder = new Recorder();
  recorder.init();
})();