'use strict';

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
var comment = document.querySelector('.text__description');


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

var ESC_KEYCODE = 27;
var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var effectRadios = document.querySelectorAll('.effects__radio');
var uploadImage = document.querySelector('.img-upload__preview img');
var effectLevelpin = uploadOverlay.querySelector('.effect-level__pin');
var effectLeveldepth = uploadOverlay.querySelector('.effect-level__depth');
var effectLevel = uploadOverlay.querySelector('.img-upload__effect-level');
var scaleControlValue = document.querySelector('.scale__control--value');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');

var inputCommentActive = function () {
  return document.activeElement === comment;
};

var onUploadOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (!inputCommentActive()) {
      uploadClose();
    }
  }
};

var uploadOpen = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEscPress);
  scaleControlValue.value = '100%';
  uploadImage.style.transform = 'scale(1)';
};

var uploadClose = function () {
  uploadOverlay.classList.add('hidden');
  uploadFile.value = '';
  document.addEventListener('keydown', onUploadOverlayEscPress);
};


uploadFile.addEventListener('change', uploadOpen);

uploadCancel.addEventListener('click', uploadClose);

effectLevel.classList.add('hidden');

effectRadios.forEach(function (effectRadio) {
  effectRadio.addEventListener('change', function () {
    uploadImage.classList = '';
    effectLevelpin.style.left = '100%';
    effectLeveldepth.style.width = '100%';
    uploadImage.classList.add('effects__preview--' + effectRadio.value);
    if ('effects__preview--' + effectRadio.value === 'effects__preview--none') {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
  });
});


var biggerUploadImage = function () {
  if (scaleControlValue.value === '100%') {
    scaleControlValue.value = '100%';
  } else {
    scaleControlValue.value = Number.parseInt(scaleControlValue.value, 10) + 25 + '%';
    uploadImage.style.transform = 'scale' + '(' + (Number.parseInt(scaleControlValue.value, 10)) / 100 + ')';
  }
};

var smallerUploadImage = function () {
  if (scaleControlValue.value === '25%') {
    scaleControlValue.value = '25%';
  } else {
    scaleControlValue.value = Number.parseInt(scaleControlValue.value, 10) - 25 + '%';
    uploadImage.style.transform = 'scale' + '(' + (Number.parseInt(scaleControlValue.value, 10)) / 100 + ')';
  }
};

scaleControlBigger.addEventListener('click', biggerUploadImage);
scaleControlSmaller.addEventListener('click', smallerUploadImage);
