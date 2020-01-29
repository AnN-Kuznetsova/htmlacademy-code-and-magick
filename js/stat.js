'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

//  Функция создания облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

//  Функция создания окна статистики
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, 100, 10, '#ffffff');
};
