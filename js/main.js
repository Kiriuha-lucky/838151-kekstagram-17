'use strict';

var objects = [];
var arrayComments = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var arrayNames = ['Артем', 'Кекс', 'Диана', 'Кристина', 'Настя', 'Гоша'];
var templatePhoto = document.querySelector('#picture').content.querySelector('.picture');
var photoContainer = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

var createRandomCount = function (num) {
  return Math.floor(Math.random() * num);
};

var createRandomComment = function () {
  return arrayComments[createRandomCount(arrayComments.length)];
};

var createArrayRandomComments = function () {
  var randomCount = Math.floor(1 + Math.random() * 15);
  var randomCommentsArray = [];
  for (var i = randomCount; i > 0; i--) {
    randomCommentsArray.push({
      avatar: 'img/avatar-' + (createRandomCount(6)) + '.svg',
      message: createRandomComment(createRandomCount(arrayComments.length) + 2),
      name: arrayNames[createRandomCount(arrayNames.length)]
    });
  }
  return randomCommentsArray;
};

var creatingArrayObjects = function () {
  for (var j = 1; j <= 25; j++) {
    objects.push({
      url: 'photos/' + j + '.jpg',
      likes: 15 + createRandomCount(185),
      comments: createArrayRandomComments()
    });
  }
  return objects;
};

creatingArrayObjects();

for (var i = 0; i < 25; i++) {
  var newElement = templatePhoto.cloneNode(true);
  newElement.querySelector('.picture__img').src = objects[i].url;
  newElement.querySelector('.picture__comments').textContent = objects[i].comments.length.toString();
  newElement.querySelector('.picture__likes').textContent = objects[i].likes;
  fragment.appendChild(newElement);
}

photoContainer.appendChild(fragment);
