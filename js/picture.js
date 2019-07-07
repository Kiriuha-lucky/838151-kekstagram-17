'use strict';

(function () {
  var templatePhoto = document.querySelector('#picture').content.querySelector('.picture');
  var photoContainer = document.querySelector('.pictures');
  var photoFragment = document.createDocumentFragment();
  var filters = document.querySelector('.img-filters');

  var renderPhotos = function (photos) {
    for (var i = 0; i < photos.length; i++) {
      var newPhoto = templatePhoto.cloneNode(true);
      newPhoto.querySelector('.picture__img').src = photos[i].url;
      newPhoto.querySelector('.picture__comments').textContent = (photos[i].comments.length).toString();
      newPhoto.querySelector('.picture__likes').textContent = (photos[i].likes).toString();
      photoFragment.append(newPhoto);
    }
    photoContainer.appendChild(photoFragment);
  };

  window.load(function (photos) {
    renderPhotos(photos);
    filters.classList.remove('img-filters--inactive');
  });
})();
