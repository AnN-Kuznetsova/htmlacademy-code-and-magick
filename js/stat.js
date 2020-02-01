'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

var TEXT_HEIGHT = 16;
var TEXT_GAP = 5; // Расстояние между строчками текста
var TEXT_COLOR = '#000000';

var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var BAR_GAP = 50;
var PLAYER_COLOR_1 = 'rgba(255, 0, 0, 1)';
var PLAYER_COLOR_2 = 'hsl(240,100%,50%)';

//  Функция создания облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

//  Функция нахождения максимального элемента в массиве
var getMaxElement = function (arr) {
  var maxElement = null;
  if (arr.length) {
    maxElement = arr[0];
    arr.forEach(element => maxElement = (element > maxElement) ? element : maxElement);
  }
  return maxElement;
};

//  Функция отрисовки текста относительно центра элемента
var fillTextCenter = function (ctx, text, textColor, baseline, elementX, elementWidth, textY) {
  ctx.fillStyle = textColor;
  ctx.textBaseline = baseline;
  ctx.fillText(text, (elementX + (elementWidth - ctx.measureText(text).width) / 2), textY);
};

//  Функция создания окна статистики
window.renderStatistics = function (ctx, names, times) {
  // отрисовка облака
  renderCloud(ctx, (CLOUD_X + GAP), (CLOUD_Y + GAP), 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.font = '16px "PT Mono"';

  // отрисовка приветствия
  fillTextCenter(ctx, 'Ура вы победили!', TEXT_COLOR, 'top', CLOUD_X, CLOUD_WIDTH, (CLOUD_Y + GAP));
  fillTextCenter(ctx, 'Список результатов:', TEXT_COLOR, 'top', CLOUD_X, CLOUD_WIDTH, (CLOUD_Y + GAP + TEXT_HEIGHT + TEXT_GAP));

  // отрисовка гистограммы
  var xStart = (CLOUD_X + (CLOUD_WIDTH - names.length * BAR_WIDTH - (names.length - 1) * BAR_GAP) / 2);
  var yStart = (CLOUD_Y + CLOUD_HEIGHT - GAP);
  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    var x = (xStart + (BAR_WIDTH + BAR_GAP) * i);
    var barHeight = (MAX_BAR_HEIGHT * times[i] / maxTime);
    fillTextCenter(ctx, names[i], TEXT_COLOR, 'bottom', x, BAR_WIDTH, yStart);
    fillTextCenter(ctx, Math.ceil(times[i]), TEXT_COLOR, 'bottom', x, BAR_WIDTH, (yStart - TEXT_HEIGHT - GAP - barHeight - GAP));
    ctx.fillStyle = (names[i] === 'Вы') ? PLAYER_COLOR_1 : PLAYER_COLOR_2.replace(/,\d+%,/, ',' + (Math.random() * 100) + '%,');
    ctx.fillRect(x, (yStart - TEXT_HEIGHT - GAP), BAR_WIDTH, -barHeight);
  }

};
