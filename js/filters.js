'use strict';

(function () {
  var filtersButtons = document.querySelectorAll('.img-filters__button');
  var activeFilter = 'filter-popular';
  var sortPhotos = [];

  filtersButtons.forEach(function (element) {
    element.addEventListener('click', function () {
      filtersButtons.forEach(function (button) {
        button.classList.remove('img-filters__button--active');
      });
      element.classList.add('img-filters__button--active');
      activeFilter = element.id;
      sortPhotoses(activeFilter);
    });
  });

  var sortPhotoses = function (sort) {
    switch (sort) {
      case 'filter-popular':
        sortPhotos = window.arrayPhotos;
        window.renderPhotos(sortPhotos);
        console.log(sortPhotos);
        break;
      case 'filter-new':
        sortPhotos = window.arrayPhotos.slice(0, 10);
        window.renderPhotos(sortPhotos);
        console.log(sortPhotos);
        break;
      case 'filter-discussed':
        sortPhotos = window.arrayPhotos.slice().sort(function (a, b) {
          return a.comments.length - b.comments.length;
        }).reverse();
        window.renderPhotos(sortPhotos);
        console.log(sortPhotos);
        break;
    }
  };
})();

