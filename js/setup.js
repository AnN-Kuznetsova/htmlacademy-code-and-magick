'use strict';
(function () {
  var wizardsParameters = window.wizardsParameters;
  var similarWizardsCount = wizardsParameters.count;

  var userDialog = document.querySelector('.setup'); // Окно настройки персонажа
  var similarListElement = userDialog.querySelector('.setup-similar-list'); // Список похожих персонажей

  var wizards = [];

  //  Шаблон похожего персонажа
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');


  //  Функция отрисовки волшебника
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  //  Функция отрисовки всех волшебников
  var renderWizards = function () {
    var fragment = document.createDocumentFragment();
    var similarWizards = updateWizards(wizards);
    var wizardsCount = (similarWizards.length < similarWizardsCount) ? similarWizards.length : similarWizardsCount;
    for (var i = 0; i < wizardsCount; i++) {
      fragment.appendChild(renderWizard(similarWizards[i]));
    }
    similarListElement.innerHTML = '';
    similarListElement.appendChild(fragment);
  };

  //  Функция нахождения ПОХОЖИХ волшебников
  var updateWizards = function (wizardsArray) {
    var sameCoatAndEyesWizards = wizardsArray.filter(function (wizard) {
      return wizard.colorCoat === window.dialog.paintedWizardsParts.coat.input.value &&
             wizard.colorEyes === window.dialog.paintedWizardsParts.eyes.input.value;
    });
    var sameCoatWizars = wizardsArray.filter(function (wizard) {
      return wizard.colorCoat === window.dialog.paintedWizardsParts.coat.input.value;
    });
    var sameEyesWizards = wizardsArray.filter(function (wizard) {
      return wizard.colorEyes === window.dialog.paintedWizardsParts.eyes.input.value;
    });

    var filteredWizards = sameCoatAndEyesWizards
                          .concat(sameCoatWizars)
                          .concat(sameEyesWizards)
                          .concat(wizardsArray);
    var uniqueWizards = filteredWizards.filter(function (wizard, i) {
      return filteredWizards.indexOf(wizard) === i;
    });

    return uniqueWizards;
  };

  var onBackendLoad = function (data) {
    wizards = data;
    renderWizards();
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

  window.backend.load(onBackendLoad, onBackendError);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  window.setup = {
    renderWizards: renderWizards
  };
})();

