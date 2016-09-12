'use strict';

require('./reviews');
var getImagesSrc = require('./get-images-src');
var Game = require('./game');
var Gallery = require('./gallery');
var form = require('./form');

var game = new Game(document.querySelector('.demo'));
game.initializeLevelAndStart();
game.setGameStatus(Game.Verdict.INTRO);

var formOpenButton = document.querySelector('.reviews-controls-new');

/** @param {MouseEvent} evt */
formOpenButton.onclick = function(evt) {
  evt.preventDefault();

  form.open(function() {
    game.setGameStatus(Game.Verdict.PAUSE);
    game.setDeactivated(true);
  });
};

form.onClose = function() {
  game.setDeactivated(false);
};

var imagesElements = document.querySelectorAll('.photogallery-image img');
var imagesLinks = document.querySelectorAll('.photogallery-image');
var imagesSrc = getImagesSrc(imagesElements);
var gallery = new Gallery(imagesSrc);

[].forEach.call(imagesLinks, function(link, index) {
  var linkPosition = index + 1;
  link.onclick = function() {
    gallery.show(linkPosition);
  };
});

var clouds = document.querySelector('.header-clouds');
var THROTTLE_TIME = 100;

var throttle = function(func, time) {
  var timerId = 0;

  return function() {
    clearTimeout(timerId);
    timerId = setTimeout(func, time);
  };
};

var pauseGame = function() {
  game.setGameStatus(Game.Verdict.PAUSE);
};

var isElemVisible = function(elem) {
  return elem.getBoundingClientRect().bottom > 0 ? true : false;
};

var throttledPauseGame = throttle(pauseGame, THROTTLE_TIME);

var gameParallax = function(elem) {
  if (isElemVisible(game.container)) {
    elem.style.backgroundPosition = window.pageYOffset + 'px';
  } else {
    throttledPauseGame();
  }
};

window.addEventListener('scroll', function() {
  gameParallax(clouds);
});
