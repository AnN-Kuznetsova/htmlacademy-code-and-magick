'use strict';

(function () {
  var StatusCode = {
    OK: 200
  };

  var TIMEOUT_IN_MS = 10000;

  var Key = {
    ESC: 'Escape',
    ENTER: 'Enter'
  };

  var onEscPress = function (evt, action) {
    if (evt.key === Key.ESC) {
      action();
    }
  };

  var onEnterPress = function (evt, action) {
    if (evt.key === Key.ENTER) {
      action();
    }
  };

  window.util = {
    isEscEvent: onEscPress,
    isEnterEvent: onEnterPress,
    StatusCode: StatusCode,
    timeout: TIMEOUT_IN_MS
  };
})();
