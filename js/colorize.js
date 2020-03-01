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

      window.similar();
    });
  };

  window.colorize = setColor;
})();
