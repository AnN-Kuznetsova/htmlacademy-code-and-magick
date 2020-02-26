'use strict';

(function () {
  var setMove = function (moveElement, pushElement, evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      moveElement.style.top = (moveElement.offsetTop - shift.y) + 'px';
      moveElement.style.left = (moveElement.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          pushElement.removeEventListener('click', onClickPreventDefault);
        };
        pushElement.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  var getElementCoords = function (element) {
    return {
      x: Math.round(element.offsetLeft),
      y: Math.round(element.offsetTop)
    };
  };

  var setElementCoords = function (element, coords) {
    element.style.top = coords.y + 'px';
    element.style.left = coords.x + 'px';
  };

  window.position = {
    move: setMove,
    getCoords: getElementCoords,
    setCoords: setElementCoords
  };
})();
