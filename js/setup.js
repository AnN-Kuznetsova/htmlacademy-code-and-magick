'use strict';

var SIMILAR_WIZADRS_COUNT = 4;
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var MIN_NAME_LENGTH = 2;

var userDialog = document.querySelector('.setup'); // Окно настройки персонажа
var similarListElement = userDialog.querySelector('.setup-similar-list'); // Список похожих персонажей

var userDialogOpen = document.querySelector('.setup-open'); // Иконка открытия окна настройки персонажа
var userDialogClose = userDialog.querySelector('.setup-close'); // Иконка закрытия окна настройки персонажа
var userNameInput = userDialog.querySelector('.setup-user-name');

//  Шаблон похожего персонажа
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

//  Функция нахождения случайного числа
var randomNamber = function (num) {
  return Math.floor(Math.random() * (num + 1));
};

//  Функция создания массива волшебников
var wizardsCreate = function (wizardsCount) {
  var wizardsArray = [];
  for (var i = 0; i < wizardsCount; i++) {
    wizardsArray[i] = {};
    wizardsArray[i].name = WIZARD_FIRST_NAMES[randomNamber(WIZARD_FIRST_NAMES.length - 1)] + ' ' + WIZARD_SECOND_NAMES[randomNamber(WIZARD_SECOND_NAMES.length - 1)];
    wizardsArray[i].coatColor = WIZARD_COAT_COLORS[randomNamber(WIZARD_COAT_COLORS.length - 1)];
    wizardsArray[i].eyesColor = WIZARD_EYES_COLORS[randomNamber(WIZARD_EYES_COLORS.length - 1)];
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
userDialogOpen.addEventListener('click', function () {
  userDialog.classList.remove('hidden');

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      userDialog.classList.add('hidden');
    }
  });
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    userDialog.classList.remove('hidden');
  }

  document.addEventListener('keydown', function (evtKey) {
    if (evtKey.key === 'Escape') {
      userDialog.classList.add('hidden');
    }
  });
});

userDialogClose.addEventListener('click', function () {
  userDialog.classList.add('hidden');
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    userDialog.classList.add('hidden');
  }
});

/*  Валидация формы в окне настройки персонажа */
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов.');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов.');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_NAME_LENGTH) {
    target.setCustomValidity('Имя должно состоять мирнимум из ' + MIN_NAME_LENGTH + '-х символов.');
  } else {
    target.setCustomValidity('');
  }
});
