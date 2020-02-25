'use strict';
(function () {
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
      wizardsArray[i] = {};
      wizardsArray[i].name = window.random.arrayElement(window.wizardsParameters.names.FIRST) + ' ' + window.random.arrayElement(window.wizardsParameters.names.SECOND);
      wizardsArray[i].coatColor = window.random.arrayElement(window.wizardsParameters.elementColors.COAT);
      wizardsArray[i].eyesColor = window.random.arrayElement(window.wizardsParameters.elementColors.EYES);
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

  var wizards = wizardsCreate(window.wizardsParameters.count);
  similarListElement.appendChild(renderWizards(wizards));

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

})();

