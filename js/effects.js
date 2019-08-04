'use strict';

(function () {
  var Effect = {
    CHROME: {
      name: 'chrome',
      effect: 'grayscale',
      defaultValue: 1,
      unit: '',
    },
    SEPIA: {
      name: 'sepia',
      effect: 'sepia',
      defaultValue: 1,
      unit: '',
    },
    MARVIN: {
      name: 'marvin',
      effect: 'invert',
      defaultValue: 100,
      unit: '%',
    },
    PHOBOS: {
      name: 'phobos',
      effect: 'blur',
      defaultValue: 3,
      unit: 'px',
    },
    HEAT: {
      name: 'heat',
      effect: 'brightness',
      defaultValue: 3,
      unit: '',
    },
    NONE: {
      name: 'none',
      effect: 'none',
      defaultValue: 'none',
      unit: 'none',
    },
  };

  var effectLevel = document.querySelector('.effect-level');
  var slider = effectLevel.querySelector('.effect-level__pin');
  var levelLine = effectLevel.querySelector('.effect-level__line');
  var effectsField = document.querySelector('.img-upload__effects');
  var effectsRadioElements = document.querySelectorAll('.effects__radio');
  var imgUploadPreview = document.querySelector('.img-upload__preview');

  function getEffectStyle(ef, value) {
    var currentEffect = ef.toUpperCase();
    var curValue = (value) ? value * Effect[currentEffect].defaultValue : Effect[currentEffect].defaultValue;
    imgUploadPreview.classList.add('effects__preview--' + Effect[currentEffect].name);
    return (currentEffect === 'none') ? 'none' : Effect[currentEffect].effect + '(' + curValue + Effect[currentEffect].unit + ')';
  }

  function onEffectsChange(evt) {
    imgUploadPreview.className = 'img-upload__preview';
    imgUploadPreview.style.filter = 'none';
    var effect = evt.target.value;

    effectLevel.classList[(effect !== 'none') ? 'remove' : 'add']('hidden');
    imgUploadPreview.style.filter = getEffectStyle(effect);
  }

  effectsRadioElements.forEach(function (item) {
    item.addEventListener('change', onEffectsChange);
  });

  function changeIntensityEffect() {
    var currentLevel = (slider.offsetLeft / levelLine.clientWidth).toFixed(1);
    var currentEffect = effectsField.querySelector('input:checked').value;

    imgUploadPreview.style.filter = getEffectStyle(currentEffect, currentLevel);
  }

  window.contentSlider(changeIntensityEffect);
})();
