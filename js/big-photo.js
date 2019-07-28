'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = document.querySelector('.big-picture__cancel');
  var bigPictureImg = document.querySelector('.big-picture__img img');
  var likes = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var description = bigPicture.querySelector('.social__caption');
  var socialComments = bigPicture.querySelector('.social__comments');



  var pictureClose = function () {
    bigPicture.classList.add('hidden');
  };

  window.photoBig = function () {
    var photos = document.querySelectorAll('.picture');
    photos.forEach(function (picture) {
      picture.addEventListener('click', bigPictureRender);
      console.log(parseInt(picture, 10));
    });
  };

  var bigPictureRender = function (evt) {
    evt.preventDefault();
    var commentItemTemplate = '<li class="social__comment"><img class="social__picture" src="img/avatar-2.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text"> first</p></li>';
    bigPicture.classList.remove('hidden');
    bigPictureImg.src = window.arrayPhotos[0].url;
    likes.textContent = window.arrayPhotos[0].likes.toString();
    commentsCount.textContent = window.arrayPhotos[0].comments.length.toString();
    socialComments.innerHTML = commentItemTemplate;
    socialComments.innerHTML = commentItemTemplate;
    description.textContent = window.arrayPhotos[0].description;
  };

  bigPictureClose.addEventListener('click', pictureClose);

  var bigPictureEscPress = function (evt) {
    window.isEscEvent(evt, pictureClose);
  };

  document.addEventListener('keydown', bigPictureEscPress);


})();

