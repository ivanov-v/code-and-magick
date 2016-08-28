'use strict';

var galleryElement = document.querySelector('.overlay-gallery');
var leftButtonElement = galleryElement.querySelector('.overlay-gallery-control-left');
var rightButtonElement = galleryElement.querySelector('.overlay-gallery-control-right');
var photoNumberElement = galleryElement.querySelector('.preview-number-current');
var photosСounterElement = galleryElement.querySelector('.preview-number-current');
var closeButtonElement = galleryElement.querySelector('.overlay-gallery-close');

var Gallery = function(pictures) {
  var self = this;
  this.pictures = pictures;
  this.activePicture = 1;
  this.rootElement = galleryElement;
  this.controls = {
    leftButtonElement: leftButtonElement,
    rightButtonElement: rightButtonElement,
    closeButtonElement: closeButtonElement
  };
  this.photoNumberElement = photoNumberElement;
  this.photosСounterElement = photosСounterElement;

  this.controls.closeButtonElement.onclick = function() {
    self.onCloseButtonElementClick();
  };

  this.controls.leftButtonElement.onclick = function() {
    self.onLeftButtonElementClick();
  };

  this.controls.rightButtonElement.onclick = function() {
    self.onRightButtonElementClick();
  };
};

Gallery.prototype.show = function() {
  this.rootElement.classList.remove('invisible');
};

Gallery.prototype.hide = function() {
  this.rootElement.classList.add('invisible');
};

Gallery.prototype.setActivePicture = function(activePicture) {
  this.activePicture = activePicture;
};

Gallery.prototype.onCloseButtonElementClick = function() {
  this.hide();
};

Gallery.prototype.onLeftButtonElementClick = function() {
  if (this.activePicture > 1) {
    this.setActivePicture(this.activePicture - 1);
    console.log(this.activePicture);
  }
};

Gallery.prototype.onRightButtonElementClick = function() {
  if (this.activePicture < this.pictures.length) {
    this.setActivePicture(this.activePicture + 1);
    console.log(this.activePicture);
  }
};

module.exports = Gallery;
