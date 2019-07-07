'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  window.load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      window.dat = xhr.response;
      onSuccess(window.dat);
    });
    xhr.send();
  };
})();

