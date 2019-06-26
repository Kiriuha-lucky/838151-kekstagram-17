'use strict';

var MINLIKES = 15;
var MAXLIKES = 200;
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
var TEMPLATEPHOTO = document.querySelector('#picture').content.querySelector('.picture');
var PHOTOCONTAINER = document.querySelector('.pictures');
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
  var randomCount = createRandomNumber(6);
  var randomComments = [];
  for (var i = randomCount; i > 0; i--) {
    randomComments.push({
      avatar: 'img/avatar-' + (createRandomNumber(6)) + '.svg',
      message: createRandomComment(),
      name: ARRAYNAMES[createRandomNumber(ARRAYNAMES.length)]
    });
  }
  return randomComments;
};

var createPhoto = function (n) {
  var newPhoto = TEMPLATEPHOTO.cloneNode(true);
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
  PHOTOCONTAINER.appendChild(photoFragment);
};

createContainerPhotos();

var ESC_KEYCODE = 27;
var UPLOADFILE = document.querySelector('#upload-file');
var UPLOADCANCEL = document.querySelector('#upload-cancel');
var UPLOADOVERLAY = document.querySelector('.img-upload__overlay');
var EFFECTRADIOS = document.querySelectorAll('.effects__radio');
var UPLOADIMAGE = document.querySelector('.img-upload__preview img');
var EFFECTLEVELPIN = UPLOADOVERLAY.querySelector('.effect-level__pin');
var EFFECTLEVELDEPTH = UPLOADOVERLAY.querySelector('.effect-level__depth');
var EFFECTLEVEL = UPLOADOVERLAY.querySelector('.img-upload__effect-level');
var SCALECONTROLVALUE = document.querySelector('.scale__control--value');
var SCALECONTROLBIGGER = document.querySelector('.scale__control--bigger');
var SCALECONTROLSMALLER = document.querySelector('.scale__control--smaller');

var onUploadOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    uploadClose();
  }
};

var uploadOpen = function () {
  UPLOADOVERLAY.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEscPress);
  SCALECONTROLVALUE.value = '100%';
  UPLOADIMAGE.style.transform = 'scale(1)';
};

var uploadClose = function () {
  UPLOADOVERLAY.classList.add('hidden');
  UPLOADFILE.value = '';
  document.addEventListener('keydown', onUploadOverlayEscPress);
};


UPLOADFILE.addEventListener('change', uploadOpen);

UPLOADCANCEL.addEventListener('click', uploadClose);

EFFECTLEVEL.classList.add('hidden');

EFFECTRADIOS.forEach(function (effectRadio) {
  effectRadio.addEventListener('change', function () {
    UPLOADIMAGE.classList = '';
    EFFECTLEVELPIN.style.left = '100%';
    EFFECTLEVELDEPTH.style.width = '100%';
    UPLOADIMAGE.classList.add('effects__preview--' + effectRadio.value);
    if ('effects__preview--' + effectRadio.value === 'effects__preview--none') {
      EFFECTLEVEL.classList.add('hidden');
    } else {
      EFFECTLEVEL.classList.remove('hidden');
    }
  });
});


var biggerUploadImage = function () {
  if (SCALECONTROLVALUE.value === '100%') {
    SCALECONTROLVALUE.value = '100%';
  } else {
    SCALECONTROLVALUE.value = Number.parseInt(SCALECONTROLVALUE.value, 10) + 25 + '%';
    UPLOADIMAGE.style.transform = 'scale' + '(' + (Number.parseInt(SCALECONTROLVALUE.value, 10)) / 100 + ')';
  }
};

var smallerUploadImage = function () {
  if (SCALECONTROLVALUE.value === '25%') {
    SCALECONTROLVALUE.value = '25%';
  } else {
    SCALECONTROLVALUE.value = Number.parseInt(SCALECONTROLVALUE.value, 10) - 25 + '%';
    UPLOADIMAGE.style.transform = 'scale' + '(' + (Number.parseInt(SCALECONTROLVALUE.value, 10)) / 100 + ')';
  }
};

SCALECONTROLBIGGER.addEventListener('click', biggerUploadImage);
SCALECONTROLSMALLER.addEventListener('click', smallerUploadImage);
