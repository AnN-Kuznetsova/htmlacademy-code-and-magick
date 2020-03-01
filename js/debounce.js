'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  var debounce = function (cb, argument) {

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(argument);
    }, DEBOUNCE_INTERVAL);
  };

  window.debounce = debounce;
})();
