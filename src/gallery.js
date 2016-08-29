'use strict';

var Gallery = function(pictures) {
  var galleryElement = document.querySelector('.overlay-gallery');
  var galleryPreviewElement = galleryElement.querySelector('.overlay-gallery-preview');
  var leftButtonElement = galleryElement.querySelector('.overlay-gallery-control-left');
  var rightButtonElement = galleryElement.querySelector('.overlay-gallery-control-right');
  var photoNumberElement = galleryElement.querySelector('.preview-number-current');
  var photosСounterElement = galleryElement.querySelector('.preview-number-total');
  var closeButtonElement = galleryElement.querySelector('.overlay-gallery-close');
  var self = this;
  this.pictures = pictures;
  this.activePicture = 1;
  this.rootElement = galleryElement;
  this.galleryPreviewElement = galleryPreviewElement;
  this.controls = {
    leftButtonElement: leftButtonElement,
    rightButtonElement: rightButtonElement,
    closeButtonElement: closeButtonElement
  };
  this.photoNumberElement = photoNumberElement;
  this.photosСounterElement = photosСounterElement;

  this.addControlsListeners = function() {
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

  this.deleteControlsListeners = function() {
    this.controls.closeButtonElement.onclick = null;
    this.controls.leftButtonElement.onclick = null;
    this.controls.rightButtonElement.onclick = null;
  };
};

Gallery.prototype.show = function(imageNumber) {
  this.rootElement.classList.remove('invisible');
  this.setActivePicture(imageNumber);
  this.setCounters();
  this.addControlsListeners();
};

Gallery.prototype.hide = function() {
  this.rootElement.classList.add('invisible');
  this.deleteControlsListeners();
};

Gallery.prototype.setCounters = function() {
  this.photoNumberElement.textContent = this.activePicture;
  this.photosСounterElement.textContent = this.pictures.length;
};

Gallery.prototype.setActivePicture = function(activePicture) {
  this.activePicture = activePicture;
  var oldPictureElement = this.galleryPreviewElement.querySelector('img');
  if (oldPictureElement) {
    oldPictureElement.remove();
  }
  var pictureElement = new Image();
  pictureElement.src = this.pictures[this.activePicture - 1];
  this.galleryPreviewElement.appendChild(pictureElement);
  this.photoNumberElement.textContent = this.activePicture;
};

Gallery.prototype.onCloseButtonElementClick = function() {
  this.hide();
};

Gallery.prototype.onLeftButtonElementClick = function() {
  if (this.activePicture > 1) {
    this.setActivePicture(this.activePicture - 1);
  }
};

Gallery.prototype.onRightButtonElementClick = function() {
  if (this.activePicture < this.pictures.length) {
    this.setActivePicture(this.activePicture + 1);
  }
};

module.exports = Gallery;
