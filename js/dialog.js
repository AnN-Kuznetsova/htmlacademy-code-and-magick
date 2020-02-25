/*  Управление окном настройки персонажа  */

'use strict';

(function () {

  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userDialog = document.querySelector('.setup'); // Окно настройки персонажа
  var userDialogOpen = document.querySelector('.setup-open'); // Иконка открытия окна настройки персонажа
  var userDialogClose = userDialog.querySelector('.setup-close'); // Иконка закрытия окна настройки персонажа
  var userNameInput = userDialog.querySelector('.setup-user-name');

  var setupPlayer = userDialog.querySelector('.setup-player');
  var setupWizardApppearance = setupPlayer.querySelector('.setup-wizard-appearance');

  var wizardCoat = setupWizardApppearance.querySelector('.wizard-coat');
  var wizardEyes = setupWizardApppearance.querySelector('.wizard-eyes');
  var wizardCoatInput = setupWizardApppearance.querySelector('input[name="coat-color"]');
  var wizardEyesInput = setupWizardApppearance.querySelector('input[name="eyes-color"]');
  var setupFireballWrap = setupPlayer.querySelector('.setup-fireball-wrap');
  var setupFireball = setupFireballWrap.querySelector('.setup-fireball');
  var setupFireballInput = setupFireballWrap.querySelector('input[name="fireball-color"]');


  //  mountedPopup() - всё добавляет
  var mountedPopup = function () {
    document.addEventListener('keydown', onPopupEscPress);
    userDialogClose.addEventListener('click', closePopup);
    userDialogClose.addEventListener('keydown', onClosePopupEnterPress);

    wizardCoat.addEventListener('click', setWizardColors);
    wizardEyes.addEventListener('click', setWizardColors);
    setupFireball.addEventListener('click', setWizardColors);

    userNameInput.addEventListener('invalid', textFieldInputValidation);
    userNameInput.addEventListener('input', textFieldLengthValidation);
  };

  //  destroyedPopup() - всё удаляет
  var destroyedPopup = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    destroyedPopup();
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, function () {
      if (evt.target === userNameInput) {
        userNameInput.blur();
      } else {
        closePopup();
      }
    });
  };

  var onClosePopupEnterPress = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    mountedPopup();
  };


  userDialogOpen.addEventListener('click', function () {
    openPopup();
  });

  userDialogOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });


  /*  Валидация формы в окне настройки персонажа  */
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


  /*  Функция покраски волшебника  */
  var setWizardColors = function (evt) {
    var colorTarget = evt.target;
    switch (colorTarget) {
      case wizardCoat:
        wizardCoatInput.value = window.random.arrayElement(WIZARD_COAT_COLORS);
        colorTarget.style.fill = wizardCoatInput.value;
        break;
      case wizardEyes:
        wizardEyesInput.value = window.random.arrayElement(WIZARD_EYES_COLORS);
        colorTarget.style.fill = wizardEyesInput.value;
        break;
      case setupFireball:
        setupFireballInput.value = window.random.arrayElement(FIREBALL_COLORS);
        colorTarget.style.backgroundColor = setupFireballInput.value;
        break;
      default:
        throw new Error('Неокрашиваемая часть волшебника.');
    }
  };

})();
