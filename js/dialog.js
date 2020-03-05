/*  Управление окном настройки персонажа  */

'use strict';

(function () {
  var userDialog = document.querySelector('.setup'); // Окно настройки персонажа
  var userDialogOpen = document.querySelector('.setup-open'); // Иконка открытия окна настройки персонажа
  var userDialogClose = userDialog.querySelector('.setup-close'); // Иконка закрытия окна настройки персонажа
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var dialogUpload = userDialog.querySelector('.upload');
  var setupWizardForm = userDialog.querySelector('.setup-wizard-form');

  var setupPlayer = userDialog.querySelector('.setup-player');
  var setupWizardApppearance = setupPlayer.querySelector('.setup-wizard-appearance');

  var wizardCoat = setupWizardApppearance.querySelector('.wizard-coat');
  var wizardEyes = setupWizardApppearance.querySelector('.wizard-eyes');
  var wizardCoatInput = setupWizardApppearance.querySelector('input[name="coat-color"]');
  var wizardEyesInput = setupWizardApppearance.querySelector('input[name="eyes-color"]');
  var setupFireballWrap = setupPlayer.querySelector('.setup-fireball-wrap');
  var setupFireball = setupFireballWrap.querySelector('.setup-fireball');
  var setupFireballInput = setupFireballWrap.querySelector('input[name="fireball-color"]');

  var paintedWizardsParts = {
    coat: {
      element: wizardCoat,
      input: wizardCoatInput,
      colors: window.wizardsParameters.elementColors.COAT
    },
    eyes: {
      element: wizardEyes,
      input: wizardEyesInput,
      colors: window.wizardsParameters.elementColors.EYES
    },
    fireball: {
      element: setupFireball,
      input: setupFireballInput,
      colors: window.wizardsParameters.elementColors.FIREBALL
    }
  };

  var defaultDialogCoords = {};

  //  mountedPopup() - всё добавляет
  var mountedPopup = function () {
    document.addEventListener('keydown', onPopupEscPress);
    userDialogClose.addEventListener('click', closePopup);
    userDialogClose.addEventListener('keydown', onClosePopupEnterPress);
    dialogUpload.addEventListener('mousedown', onDialogUploadMousedown);
    setupWizardForm.addEventListener('submit', onSetupWizardFormSubmit);

    for (var paintedPart in paintedWizardsParts) {
      if (paintedWizardsParts[paintedPart]) {
        window.colorize(paintedWizardsParts[paintedPart]);
      }
    }

    window.validation(userNameInput);
    window.avatar();
  };

  //  destroyedPopup() - всё удаляет
  var destroyedPopup = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    window.position.setCoords(userDialog, defaultDialogCoords);
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
    defaultDialogCoords = window.position.getCoords(userDialog);
  };

  var onDialogUploadMousedown = function (evt) {
    window.position.move(userDialog, dialogUpload, evt);
  };

  var onBackendLoad = function () {
    closePopup();
  };

  var onBackendError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onSetupWizardFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(setupWizardForm), onBackendLoad, onBackendError);
  };


  userDialogOpen.addEventListener('click', function () {
    openPopup();
  });

  userDialogOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  window.dialog = {
    paintedWizardsParts: paintedWizardsParts
  };
})();
