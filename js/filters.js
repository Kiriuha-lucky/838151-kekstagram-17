'use strict';

(function () {
  var NEW_PICTURES = 10;
  var RANDOM_COEFFICIENT = 0.5;
  var Filter = {
    DISCUSSED: 'filter-discussed',
    NEW: 'filter-new'
  };
  var pictureList = document.querySelector('.pictures');
  var filtersElement = document.querySelector('.img-filters');
  var filtersForm = document.querySelector('.img-filters__form');
  var filtersButton = filtersForm.querySelectorAll('.img-filters__button');
  var activeButton = filtersForm.querySelector('.img-filters__button--active');
  var pictures = [];

  function clearPictures() {
    pictureList.querySelectorAll('.picture').forEach(function (element) {
      element.remove();
    });
  }

  function getPopularPhotos(photos) {
    return photos;
  }

  function getDiscussedPhotos(photos) {
    var copyPhotos = photos.slice();
    return copyPhotos.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  }

  function getNewPhotos(photos) {
    var copyPhotos = photos.slice();
    return copyPhotos.sort(function () {
      return Math.random() - RANDOM_COEFFICIENT;
    }).slice(0, NEW_PICTURES);
  }

  function onFilterButtonClick(buttonElement) {
    filtersButton.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });

    buttonElement.classList.add('img-filters__button--active');
  }

  function getFilterPhotos(filter) {
    switch (filter) {
      case Filter.DISCUSSED:
        return getDiscussedPhotos(pictures);
      case Filter.NEW:
        return getNewPhotos(pictures);
      default:
        return getPopularPhotos(pictures);
    }
  }

  function onFilterChange(evt) {
    evt.preventDefault();
    clearPictures();
    onFilterButtonClick(evt.target);
    window.gallery.render(getFilterPhotos(evt.target.id));
  }

  function showLoadSuccess(item) {
    pictures = item;
    window.gallery.render(getFilterPhotos(activeButton.id));
    filtersElement.classList.remove('img-filters--inactive');
    filtersForm.addEventListener('click', window.util.debounce(onFilterChange));
  }

  window.filter = {
    init: showLoadSuccess,
  };
})();

