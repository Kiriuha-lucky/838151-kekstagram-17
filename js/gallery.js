'use strict';

(function () {
  var ERROR_TEXT_SIZE = 50;
  var ERROR_POSITION = 0;
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var picturesList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  function renderPicture(photo) {
    var picturesElement = pictureTemplate.cloneNode(true);
    picturesElement.querySelector('.picture__img').src = photo.url;
    picturesElement.querySelector('.picture__comments').textContent = photo.comments.length;
    picturesElement.querySelector('.picture__likes').textContent = photo.likes;

    picturesElement.addEventListener('click', onPictureClick);

    return picturesElement;

    function onPictureClick(evt) {
      evt.preventDefault();
      window.bigPicture.open(photo);
    }
  }

  function displayPictures(pictureItems) {

    for (var i = 0; i < pictureItems.length; i++) {
      var picture = renderPicture(pictureItems[i]);
      fragment.appendChild(picture);
    }
    picturesList.appendChild(fragment);
  }

  function onError(errorMessage) {
    var block = document.createElement('div');
    block.style = 'z-index: 100; text-align: center; background-color: red; color: white;';
    block.style.position = 'absolute';
    block.style.left = ERROR_POSITION;
    block.style.right = ERROR_POSITION;
    block.style.fontSize = ERROR_TEXT_SIZE + 'px';

    block.textContent = errorMessage;
    document.body.insertAdjacentElement('beforebegin', block);
  }

  window.load.load(window.filter.init, onError);

  window.gallery = {
    render: displayPictures,
  };
})();
