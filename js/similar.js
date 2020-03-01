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

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.dialog.paintedWizardsParts.coat.input.value) {
      rank += 2;
    }
    if (wizard.colorEyes === window.dialog.paintedWizardsParts.eyes.input.value) {
      rank += 1;
    }

    return rank;
  };

  var namesComporator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

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
    var sameWizards = wizardsArray.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComporator(left.name, right.name);
      }
      return rankDiff;
    });

    return sameWizards;
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

  window.similar = renderWizards;
})();

