'use strict';

var OBJECTS = [];
var ARRAYCOMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var ARRAYNAMES = ['Артем', 'Кекс', 'Диана', 'Кристина', 'Настя', 'Гоша'];
var TEMPLATEPHOTO = document.querySelector('#picture').content.querySelector('.picture');
var PHOTOCONTAINER = document.querySelector('.pictures');
var FRAGMENT = document.createDocumentFragment();


var createRandomCount = function (num) {
  return Math.floor(Math.random() * num);
};

var createRandomComment = function () {
  return ARRAYCOMMENTS[createRandomCount(ARRAYCOMMENTS.length)];
};

var createArrayRandomComments = function () {
  var randomCount = createRandomCount(15);
  var randomCommentsArray = [];
  for (var i = randomCount; i > 0; i--) {
    randomCommentsArray.push({
      avatar: 'img/avatar-' + (createRandomCount(6)) + '.svg',
      message: createRandomComment(createRandomCount(ARRAYCOMMENTS.length) + 2),
      name: ARRAYNAMES[createRandomCount(ARRAYNAMES.length)]
    });
  }
  return randomCommentsArray;
};

var creatingArrayObjects = function () {
  for (var j = 1; j <= 25; j++) {
    OBJECTS.push({
      url: 'photos/' + j + '.jpg',
      likes: 15 + createRandomCount(185),
      comments: createArrayRandomComments()
    });
  }
  return OBJECTS;
};

creatingArrayObjects();

for (var i = 0; i < 25; i++) {
  var newElement = TEMPLATEPHOTO.cloneNode(true);
  newElement.querySelector('.picture__img').src = OBJECTS[i].url;
  newElement.querySelector('.picture__comments').textContent = OBJECTS[i].comments.length.toString();
  newElement.querySelector('.picture__likes').textContent = OBJECTS[i].likes;
  FRAGMENT.appendChild(newElement);
}

PHOTOCONTAINER.appendChild(FRAGMENT);

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

