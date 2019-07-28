'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  window.arrayPhotos = [];

  window.load = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      window.arrayPhotos = Array.from(xhr.response);
      window.renderPhotos(xhr.response);
    });

    xhr.send();
  };
  window.load();
})();

