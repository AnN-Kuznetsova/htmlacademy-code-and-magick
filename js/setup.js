'use strict';
(function () {
  var SIMILAR_WIZADRS_COUNT = 4;
  var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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
      wizardsArray[i].name = window.random.arrayElement(WIZARD_FIRST_NAMES) + ' ' + window.random.arrayElement(WIZARD_SECOND_NAMES);
      wizardsArray[i].coatColor = window.random.arrayElement(WIZARD_COAT_COLORS);
      wizardsArray[i].eyesColor = window.random.arrayElement(WIZARD_EYES_COLORS);
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

  var wizards = wizardsCreate(SIMILAR_WIZADRS_COUNT);
  similarListElement.appendChild(renderWizards(wizards));

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

})();

