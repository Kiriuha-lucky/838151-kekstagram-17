'use strict';

(function () {
  var MINLIKES = 15;
  var MAXLIKES = 200;
  var MAXCOMMENTS = 6;
  var USERNUMBER = 6;
  var PHOTOSNUMBER = 25;
  var ARRAYCOMMENTS = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var ARRAYNAMES = ['Артем',
    'Кекс',
    'Диана',
    'Кристина',
    'Настя',
    'Гоша'];
  var templatePhoto = document.querySelector('#picture').content.querySelector('.picture');
  var photoContainer = document.querySelector('.pictures');
  var photoFragment = document.createDocumentFragment();

  var createRandomNumber = function (num) {
    return Math.floor(Math.random() * num);
  };


  var createRandomComment = function () {
    var numberLines = Math.ceil(Math.random() * 2);
    if (numberLines === 1) {
      return ARRAYCOMMENTS[createRandomNumber(ARRAYCOMMENTS.length)];
    } else {
      return ARRAYCOMMENTS[createRandomNumber(ARRAYCOMMENTS.length)] + ARRAYCOMMENTS[createRandomNumber(ARRAYCOMMENTS.length)];
    }
  };


  var createRandomComments = function () {
    var randomCount = createRandomNumber(MAXCOMMENTS);
    var randomComments = [];
    for (var i = randomCount; i > 0; i--) {
      randomComments.push({
        avatar: 'img/avatar-' + (createRandomNumber(USERNUMBER)) + '.svg',
        message: createRandomComment(),
        name: ARRAYNAMES[createRandomNumber(ARRAYNAMES.length)]
      });
    }
    return randomComments;
  };

  var createPhoto = function (n) {
    var newPhoto = templatePhoto.cloneNode(true);
    newPhoto.querySelector('.picture__img').src = 'photos/' + (n + 1).toString() + '.jpg';
    newPhoto.querySelector('.picture__comments').textContent = createRandomComments().length;
    newPhoto.querySelector('.picture__likes').textContent = MINLIKES + createRandomNumber(MAXLIKES - MINLIKES);
    return newPhoto;
  };

  var createPhotos = function () {
    var arrayPhotos = [];
    for (var n = 0; n < PHOTOSNUMBER; n++) {
      arrayPhotos.push(createPhoto(n));
    }
    return arrayPhotos;
  };

  var createContainerPhotos = function () {
    for (var i = 0; i < PHOTOSNUMBER; i++) {
      photoFragment.append(createPhotos()[i]);
    }
    photoContainer.appendChild(photoFragment);
  };

  createContainerPhotos();
})();
