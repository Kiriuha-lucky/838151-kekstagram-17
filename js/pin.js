'use strict';

(function () {
  var EFFECT_MIN = 0;
  var PERCENT_MAX = 100;
  var MAX_SLIDER_LENGTH = '100%';
  var slider = document.querySelector('.effect-level__pin');
  var levelDepth = document.querySelector('.effect-level__depth');
  var effectsList = document.querySelector('.effects__list');
  var levelLine = document.querySelector('.effect-level__line');

  window.contentSlider = function (changeIntensityEffect) {
    effectsList.addEventListener('click', function () {
      slider.style.left = MAX_SLIDER_LENGTH;
      levelDepth.style.width = MAX_SLIDER_LENGTH;
    });

    function convertCoordInPercent(coord, fullWidth) {
      var percent = (coord * PERCENT_MAX) / fullWidth + '%';
      return percent;
    }

    function onSliderChange(evt) {
      evt.preventDefault();
      var startCoords = evt.clientX;
      var effectLevelLineWidth = levelLine.offsetWidth;
      var coordSliderLine = levelLine.getBoundingClientRect();
      var coordSliderLineRight = coordSliderLine.left + effectLevelLineWidth;

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();

        var shift = startCoords - moveEvt.clientX;
        startCoords = moveEvt.clientX;
        var effectPinCoord = slider.offsetLeft - shift;

        if (moveEvt.clientX < coordSliderLine.left) {
          effectPinCoord = EFFECT_MIN;
        }

        if (moveEvt.clientX > coordSliderLineRight) {
          effectPinCoord = effectLevelLineWidth;
        }

        var pinPosition = convertCoordInPercent(effectPinCoord, effectLevelLineWidth);
        slider.style.left = pinPosition;
        levelDepth.style.width = pinPosition;

        changeIntensityEffect();
      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    slider.addEventListener('mousedown', onSliderChange);
  };
})();
