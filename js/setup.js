'use strict';
(function () {
  var wizardsParameters = window.wizardsParameters;
  var similarWizardsCount = wizardsParameters.count;
  var wizardFirstName = wizardsParameters.names.FIRST;
  var wizardSecondName = wizardsParameters.names.SECOND;
  var wizardCoatColors = wizardsParameters.elementColors.COAT;
  var wizardEyesColors = wizardsParameters.elementColors.EYES;

  var userDialog = document.querySelector('.setup'); // Окно настройки персонажа
  var similarListElement = userDialog.querySelector('.setup-similar-list'); // Список похожих персонажей

  //  Шаблон похожего персонажа
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  //  Функция создания массива волшебников
  var wizardsCreate = function (wizardsCount) {
    var wizardsArray = [];
    for (var i = 0; i < wizardsCount; i++) {
      wizardsArray.push({
        name: window.random.arrayElement(wizardFirstName) + ' ' + window.random.arrayElement(wizardSecondName),
        coatColor: window.random.arrayElement(wizardCoatColors),
        eyesColor: window.random.arrayElement(wizardEyesColors)
      });
    }
    return wizardsArray;
  };

  //  Функция отрисовки волшебника
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  //  Функция отрисовки всех волшебников
  var renderWizards = function (wizardsArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizardsArray.length; i++) {
      fragment.appendChild(renderWizard(wizardsArray[i]));
    }
    return fragment;
  };

  var wizards = wizardsCreate(similarWizardsCount);
  similarListElement.appendChild(renderWizards(wizards));

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

})();

