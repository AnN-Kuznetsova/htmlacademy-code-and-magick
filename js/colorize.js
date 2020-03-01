'use strict';

(function () {
  var setColor = function (paintableElement) {
    //var color;
    paintableElement.element.addEventListener('click', function () {
      var color = window.random.arrayElement(paintableElement.colors);
      paintableElement.input.value = color;
      if (paintableElement.element.tagName.toLowerCase() === 'div') {
        paintableElement.element.style.backgroundColor = color;
      } else {
        paintableElement.element.style.fill = color;
      }

      //return color;
      /* window.console.log(paintableElement);
      window.setup.updateWizards(); */
      window.setup.renderWizards();
    });
  };

  window.colorize = setColor;
})();
