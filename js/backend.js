'use strict';
(function () {
  var StatusCode = window.util.StatusCode;
  var TIMEOUT = window.util.timeout;

  var URL = {
    save: 'https://js.dump.academy/code-and-magick',
    load: 'https://js.dump.academy/code-and-magick/data1'
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.open('POST', URL.save);
    xhr.send(data);
  };


  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс.');
    });
    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL.load);
    xhr.send();
  };


  window.backend = {
    load: load,
    save: save
  };
})();
