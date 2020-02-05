'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var SIMILAR_WIZADRS_COUNT = 4;
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup'); // Окно настройки персонажа
var similarListElement = userDialog.querySelector('.setup-similar-list'); // Список похожих персонажей

var userDialogOpen = document.querySelector('.setup-open'); // Иконка открытия окна настройки персонажа
var userDialogClose = userDialog.querySelector('.setup-close'); // Иконка закрытия окна настройки персонажа
var userNameInput = userDialog.querySelector('.setup-user-name');
var minNameLendth = userNameInput.getAttribute('minlength');
var maxNameLendth = userNameInput.getAttribute('maxlength');

var setupPlayer = userDialog.querySelector('.setup-player');
var setupWizardApppearance = setupPlayer.querySelector('.setup-wizard-appearance');
var wizardCoat = setupWizardApppearance.querySelector('.wizard-coat');
var wizardEyes = setupWizardApppearance.querySelector('.wizard-eyes');
var wizardCoatInput = setupWizardApppearance.querySelector('input[name="coat-color"]');
var wizardEyesInput = setupWizardApppearance.querySelector('input[name="eyes-color"]');
var setupFireballWrap = setupPlayer.querySelector('.setup-fireball-wrap');
var setupFireball = setupFireballWrap.querySelector('.setup-fireball');
var setupFireballInput = setupFireballWrap.querySelector('input[name="fireball-color"]');

//  Шаблон похожего персонажа
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

//  Функция нахождения случайного числа
var randomNumber = function (num) {
  return Math.floor(Math.random() * (num + 1));
};

//  Функция выбора случачйного элемента массива
var getRandomArrayElement = function (array) {
  return array[randomNumber(array.length - 1)];
};

//  Функция создания массива волшебников
var wizardsCreate = function (wizardsCount) {
  var wizardsArray = [];
  for (var i = 0; i < wizardsCount; i++) {
    wizardsArray[i] = {};
    wizardsArray[i].name = getRandomArrayElement(WIZARD_FIRST_NAMES) + ' ' + getRandomArrayElement(WIZARD_SECOND_NAMES);
    wizardsArray[i].coatColor = getRandomArrayElement(WIZARD_COAT_COLORS);
    wizardsArray[i].eyesColor = getRandomArrayElement(WIZARD_EYES_COLORS);
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


/*  Открытие/закрытие окна настройки персонажа  */
var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    if (evt.target === userNameInput) {
      userNameInput.blur();
    } else {
      closePopup();
    }
  }
};

var onClosePopupEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);

  userDialogClose.addEventListener('click', closePopup);
  userDialogClose.addEventListener('keydown', onClosePopupEnterPress);
};

// // // // // // //

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

// // // // // // // //

/* userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
}); */

/*  Валидация формы в окне настройки персонажа */
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из ' + minNameLendth + '-х символов.');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать ' + maxNameLendth + '-ти символов.');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < minNameLendth) {
    target.setCustomValidity('Имя должно состоять мирнимум из ' + minNameLendth + '-х символов.');
  } else {
    target.setCustomValidity('');
  }
});

/*  Функция покраски волшебника  */
var setWizardColors = function (evt) {
  var colorTarget = evt.target;
  switch (colorTarget) {
    case wizardCoat:
      wizardCoatInput.value = getRandomArrayElement(WIZARD_COAT_COLORS);
      colorTarget.style.fill = wizardCoatInput.value;
      break;
    case wizardEyes:
      wizardEyesInput.value = getRandomArrayElement(WIZARD_EYES_COLORS);
      colorTarget.style.fill = wizardEyesInput.value;
      break;
    case setupFireball:
      setupFireballInput.value = getRandomArrayElement(FIREBALL_COLORS);
      colorTarget.style.backgroundColor = setupFireballInput.value;
  }
};

wizardCoat.addEventListener('click', setWizardColors);
wizardEyes.addEventListener('click', setWizardColors);
setupFireball.addEventListener('click', setWizardColors);
