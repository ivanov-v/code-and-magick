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
var imagesSrc = getImagesSrc(imagesElements);
var gallery = new Gallery(imagesSrc);
