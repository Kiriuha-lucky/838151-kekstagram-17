'use strict';

(function () {
  var COMMENT_COUNT = 5;
  var bigPicture = document.querySelector('.big-picture');
  var urlPicture = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsList = bigPicture.querySelector('.social__comments');
  var commentsCountElement = bigPicture.querySelector('.social__comment-count');
  var commentLoader = bigPicture.querySelector('.comments-loader');
  var description = document.querySelector('.social__caption');
  var closeButton = bigPicture.querySelector('.big-picture__cancel');
  var commentsPart = document.createDocumentFragment();

  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, onCloseWindowClick);
  }

  function onCloseWindowClick() {
    bigPicture.classList.add('hidden');
    closeButton.removeEventListener('click', onCloseWindowClick);
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function renderComment(comment) {
    var li = document.createElement('li');
    li.classList.add('social__comment');
    var image = document.createElement('img');
    image.classList.add('social__picture');
    var p = document.createElement('p');
    p.classList.add('social__text');

    image.src = comment.avatar;
    image.alt = comment.name;
    p.textContent = comment.message;

    li.appendChild(image);
    li.appendChild(p);

    return li;
  }

  function showBigPicture(photo) {
    urlPicture.src = photo.url;
    likesCount.textContent = photo.likes;
    description.textContent = photo.description;
    renderComments(photo.comments);

    bigPicture.classList.remove('hidden');
    closeButton.addEventListener('click', onCloseWindowClick);
    document.addEventListener('keydown', onPopupEscPress);

    function renderComments(comments) {
      var currentIndex = 0;

      commentsList.innerHTML = '';
      commentsCountElement.classList.remove('visually-hidden');
      commentLoader.classList.remove('hidden');

      renderCommentsStep();
      commentLoader.addEventListener('click', onLoaderClick);

      function renderCommentsStep() {
        var lastIndex = Math.min(currentIndex + COMMENT_COUNT, comments.length);
        for (var i = currentIndex; i < lastIndex; i++) {
          commentsPart.appendChild(renderComment(comments[i]));
        }

        commentsList.appendChild(commentsPart);

        currentIndex = i;
        commentsCountElement.textContent = currentIndex + ' из ' + comments.length + ' комментариев';

        if (currentIndex === comments.length) {
          commentLoader.classList.add('hidden');
          commentLoader.removeEventListener('click', onLoaderClick);
        }
      }

      function onLoaderClick(evt) {
        evt.preventDefault();
        renderCommentsStep();
      }
    }
  }

  window.bigPicture = {
    open: showBigPicture,
  };

})();
