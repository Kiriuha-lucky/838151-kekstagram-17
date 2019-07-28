'use strict';

(function () {

  var templatePhoto = document.querySelector('#picture').content.querySelector('.picture');
  var photoContainer = document.querySelector('.pictures');
  var photoFragment = document.createDocumentFragment();
  var filterButtons = document.querySelector('.img-filters');

  window.renderPhotos = function (photos) {
    removePhotos();
    for (var i = 0; i < photos.length; i++) {
      var newPhoto = templatePhoto.cloneNode(true);
      newPhoto.querySelector('.picture__img').src = photos[i].url;
      newPhoto.querySelector('.picture__comments').textContent = (photos[i].comments.length).toString();
      newPhoto.querySelector('.picture__likes').textContent = (photos[i].likes).toString();
      photoFragment.append(newPhoto);
    }
    photoContainer.appendChild(photoFragment);
    filterButtons.classList.remove('img-filters--inactive');
  };

  var removePhotos = function () {
    var photos = document.querySelectorAll('.picture');
    for (var i = 0; i < photos.length; i++) {
      photoContainer.removeChild(photos[i]);
    }
  };
})();
