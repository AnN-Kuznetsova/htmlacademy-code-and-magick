'use strict';

(function () {
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
    window.wizardsParameters.wizards = data;
    window.renderWizards(data);
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

  window.similar = updateWizards;
})();

