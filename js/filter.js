'use strict';

(function () {
  var filterButtons = document.querySelectorAll('.img-filters__button');
  // var button = {
  //   popular: document.querySelector('#filter-popular'),
  //   new: document.querySelector('#filter-new'),
  //   discussed: document.querySelector('#filter-discussed')
  // };

  filterButtons.forEach(function (filterButton) {
    filterButton.addEventListener('click', function () {
      filterButton.classList.remove('img-filters__button--active');
      filterButton.classList.add('img-filters__button--active');
    });
  });

  // var sortDiscussed = window.data.sort(function (a, b) {
  //   return a.comments - b.comments;
  // });
  //
  // console.log(sortDiscussed);

})();
