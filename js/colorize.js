'use strict';

(function () {
  var setColor = function (paintableElement) {
    paintableElement.element.addEventListener('click', function () {
      var color = window.random.arrayElement(paintableElement.colors);
      paintableElement.input.value = color;
      if (paintableElement.element.tagName.toLowerCase() === 'div') {
        paintableElement.element.style.backgroundColor = color;
      } else {
        paintableElement.element.style.fill = color;
      }

      switch (paintableElement) {
        case window.dialog.paintedWizardsParts.coat:
          onCoatColorChange();
          break;
        case window.dialog.paintedWizardsParts.eyes:
          onEyesColorChange();
          break;
        default:
          throw new Error('Неокрашиваемая часть волшебника.');
      }
    });
  };

  var onCoatColorChange = window.debounce(function () {
    window.renderWizards(window.wizardsParameters.wizards);
  });

  var onEyesColorChange = window.debounce(function () {
    window.renderWizards(window.wizardsParameters.wizards);
  });

  window.colorize = setColor;
})();
