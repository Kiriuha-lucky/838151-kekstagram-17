'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var effectRadios = document.querySelectorAll('.effects__radio');
  var uploadImage = document.querySelector('.img-upload__preview img');
  var effectLevelpin = uploadOverlay.querySelector('.effect-level__pin');
  var effectLeveldepth = uploadOverlay.querySelector('.effect-level__depth');
  var effectLevel = uploadOverlay.querySelector('.img-upload__effect-level');
  var effectLevelline = uploadOverlay.querySelector('.effect-level__line');
  var effectLevelvalue = uploadOverlay.querySelector('.effect-level__value');
  var effectLevellineWidth = 453;
  var scaleControlValue = document.querySelector('.scale__control--value');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var comment = document.querySelector('.text__description');

  var inputCommentActive = function () {
    return document.activeElement === comment;
  };

  var uploadOpen = function () {
    uploadOverlay.classList.remove('hidden');
    scaleControlValue.value = '100%';
    uploadImage.style.transform = 'scale(1)';
    uploadImage.classList = '';
    effectLevelpin.style.left = '100%';
    effectLeveldepth.style.width = '100%';
    effectLevel.classList.add('hidden');
  };

  var uploadClose = function () {
    uploadOverlay.classList.add('hidden');
    uploadFile.value = '';
    document.removeEventListener('keydown', function () {});
  };

  uploadFile.addEventListener('change', uploadOpen);

  uploadCancel.addEventListener('click', uploadClose);

  document.addEventListener('keydown', function (evt) {
    if (!inputCommentActive()) {
      window.isEscEvent(evt, uploadClose);
    }
  });

  effectLevel.classList.add('hidden');


  // var chooseEffect;
  //
  // var effectSelection = function (effectRadio) {
  //   uploadImage.classList = '';
  //   effectLevelpin.style.left = '100%';
  //   effectLeveldepth.style.width = '100%';
  //   chooseEffect = effectRadio.value;
  //   uploadImage.classList.add('effects__preview--' + chooseEffect);
  //   console.log(uploadImage.classList);
  //   if ('effects__preview--' + effectRadio.value === 'effects__preview--none') {
  //     effectLevel.classList.add('hidden');
  //   } else {
  //     effectLevel.classList.remove('hidden');
  //   }
  //   return chooseEffect;
  // };
  //
  // effectRadios.forEach(function (effectRadio) {
  //   effectRadio.addEventListener('change', effectSelection() {}
  //   );
  // });
  //
  //
  // var setEffect = function (num) {
  //   var effectStrength;
  //   switch (uploadImage.classList.contains('effects__preview--' + chooseEffect)) {
  //     case uploadImage.classList.contains('effects__preview--chrome'):
  //       effectStrength = 'grayscale(' + 1 * num / 100 + ')';
  //       break;
  //     case uploadImage.classList.contains('effects__preview--sepia'):
  //       effectStrength = 'sepia(' + 1 * num / 100 + ')';
  //       break;
  //     case uploadImage.classList.contains('effects__preview--marvin'):
  //       effectStrength = 'invert(' + num + '%)';
  //       break;
  //     case uploadImage.classList.contains('effects__preview--phobos'):
  //       effectStrength = 'blur(' + 3 * num / 100 + 'px)';
  //       break;
  //     case uploadImage.classList.contains('effects__preview--heat'):
  //       effectStrength = 'brightness(' + ((num * (3 - 1) / 100) + 1) + ')';
  //       break;
  //     default:
  //       effectStrength = '';
  //   }
  //   uploadImage.style.filter = effectStrength;
  //   effectLevelvalue.value = Math.floor(num);
  // };


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
      setEffect(100);
    });
  });


  var setEffect = function (num) {
    switch (true) {
      case uploadImage.classList.contains('effects__preview--chrome'):
        uploadImage.style.filter = 'grayscale(' + 1 * num / 100 + ')';
        break;
      case uploadImage.classList.contains('effects__preview--sepia'):
        uploadImage.style.filter = 'sepia(' + 1 * num / 100 + ')';
        break;
      case uploadImage.classList.contains('effects__preview--marvin'):
        uploadImage.style.filter = 'invert(' + num + '%)';
        break;
      case uploadImage.classList.contains('effects__preview--phobos'):
        uploadImage.style.filter = 'blur(' + 3 * num / 100 + 'px)';
        break;
      case uploadImage.classList.contains('effects__preview--heat'):
        uploadImage.style.filter = 'brightness(' + ((num * (3 - 1) / 100) + 1) + ')';
        break;
      default:
        uploadImage.style.filter = '';
    }
    effectLevelvalue.value = Math.floor(num);
  };


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

  effectLevelpin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      effectLevelpin.style.left = (effectLevelpin.offsetLeft - shift.x) + 'px';
      effectLeveldepth.style.width = (parseInt(effectLevelpin.style.left, 10) * 100 / effectLevellineWidth) + '%';
      setEffect(parseInt(effectLeveldepth.style.width, 10));


      if (effectLevelpin.offsetLeft - shift.x < 0) {
        effectLevelpin.style.left = '0';
        effectLeveldepth.style.width = '0';
      } else if (effectLevelpin.offsetLeft - shift.x > effectLevellineWidth) {
        effectLevelpin.style.left = effectLevellineWidth + 'px';
        effectLeveldepth.style.width = '100%';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  effectLevelline.addEventListener('click', function (clickEvt) {
    clickEvt.preventDefault();

    var rect = effectLevelpin.getBoundingClientRect();

    var effectLevelCoords = {
      x: rect.left,
    };

    var clickLevelCoords = {
      x: effectLevelCoords.x - clickEvt.clientX + 9,
    };

    effectLevelCoords = {
      x: clickLevelCoords.x,
    };

    effectLevelpin.style.left = (effectLevelpin.offsetLeft - clickLevelCoords.x) + 'px';
    effectLeveldepth.style.width = ((effectLevelpin.offsetLeft) * 100 / effectLevellineWidth) + '%';
    setEffect(parseInt(effectLeveldepth.style.width, 10));
  });
})();
