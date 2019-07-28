'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  window.arrayPhotos = [];
  window.photo = '';

  var onLoad = function () {
    window.photoBig();
  };

  window.load = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      window.arrayPhotos = Array.from(xhr.response);
      window.photo = document.querySelector('.picture');
      window.renderPhotos(xhr.response);
      onLoad();
    });

    xhr.send();
  };
  window.load();
})();

