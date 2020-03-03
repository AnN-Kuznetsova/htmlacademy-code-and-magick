'use strict';

(function () {
  var wizardsParameters = window.wizardsParameters;
  var similarWizardsCount = wizardsParameters.count;

  var userDialog = document.querySelector('.setup'); // Окно настройки персонажа
  var similarListElement = userDialog.querySelector('.setup-similar-list'); // Список похожих персонажей

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
  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    var similarWizards = window.similar(wizards);
    var wizardsCount = (similarWizards.length < similarWizardsCount) ? similarWizards.length : similarWizardsCount;
    for (var i = 0; i < wizardsCount; i++) {
      fragment.appendChild(renderWizard(similarWizards[i]));
    }
    similarListElement.innerHTML = '';
    similarListElement.appendChild(fragment);
  };

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  window.renderWizards = renderWizards;
})();
