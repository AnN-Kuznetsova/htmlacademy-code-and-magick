'use strict';
(function () {
  var wizardsParameters = window.wizardsParameters;
  var similarWizardsCount = wizardsParameters.count;
  /* var wizardFirstName = wizardsParameters.names.FIRST;
  var wizardSecondName = wizardsParameters.names.SECOND;
  var wizardCoatColors = wizardsParameters.elementColors.COAT;
  var wizardEyesColors = wizardsParameters.elementColors.EYES; */

  var userDialog = document.querySelector('.setup'); // Окно настройки персонажа
  var similarListElement = userDialog.querySelector('.setup-similar-list'); // Список похожих персонажей

  //  Шаблон похожего персонажа
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  //  Функция создания массива волшебников
  /* var wizardsCreate = function (wizardsCount) {
    var wizardsArray = [];
    for (var i = 0; i < wizardsCount; i++) {
      wizardsArray.push({
        name: window.random.arrayElement(wizardFirstName) + ' ' + window.random.arrayElement(wizardSecondName),
        coatColor: window.random.arrayElement(wizardCoatColors),
        eyesColor: window.random.arrayElement(wizardEyesColors)
      });
    }
    return wizardsArray;
  }; */

  //  Функция отрисовки волшебника
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  //  Функция отрисовки всех волшебников
  var renderWizards = function (wizardsArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < similarWizardsCount; i++) {
      fragment.appendChild(renderWizard(wizardsArray[i]));
    }
    return fragment;
  };

  /* var wizards = wizardsCreate(similarWizardsCount);
  similarListElement.appendChild(renderWizards(wizards)); */

  var onBackendLoad = function (wizards) {
    similarListElement.appendChild(renderWizards(wizards));
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

})();

