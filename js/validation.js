'use strict';

(function () {
  var setValidation = function (element) {
    element.addEventListener('invalid', textFieldInputValidation);
    element.addEventListener('input', textFieldLengthValidation);
  };

  var textFieldInputValidation = function (evt) {
    var target = evt.target;
    if (target.validity.tooShort) {
      target.setCustomValidity('Имя должно состоять минимум из ' + target.getAttribute('minlength') + '-х символов.');
    } else if (target.validity.tooLong) {
      target.setCustomValidity('Имя не должно превышать ' + target.getAttribute('maxlength') + '-ти символов.');
    } else if (target.validity.valueMissing) {
      target.setCustomValidity('Обязательное поле.');
    } else {
      target.setCustomValidity('');
    }
  };

  var textFieldLengthValidation = function (evt) {
    var target = evt.target;
    if (target.value.length < target.getAttribute('minlength')) {
      target.setCustomValidity('Имя должно состоять минимум из ' + target.getAttribute('minlength') + '-х символов.');
    } else {
      target.setCustomValidity('');
    }
  };

  window.validation = setValidation;
})();
