'use strict';

var galleryElement = document.querySelector('.overlay-gallery');
var leftButtonElement = galleryElement.querySelector('.overlay-gallery-control-left');
var rightButtonElement = galleryElement.querySelector('.overlay-gallery-control-right');
var photoNumberElement = galleryElement.querySelector('.preview-number-current');
var photosСounterElement = galleryElement.querySelector('.preview-number-current');
var closeButtonElement = galleryElement.querySelector('.overlay-gallery-close');

var imagesElements = document.querySelectorAll('.photogallery img');

var getImagesSrc = function(images) {
  var imagesArr = [];
  [].forEach.call(images, function(image) {
    imagesArr.push(image.src);
  });
  return imagesArr;
};

var Gallery = function(pictures, activePicture) {
  this.pictures = pictures;
  this.activePicture = activePicture;
  this.rootElement = galleryElement;
  this.controls = {
    leftButtonElement: leftButtonElement,
    rightButtonElement: rightButtonElement,
    closeButtonElement: closeButtonElement
  };
  this.photoNumberElement = photoNumberElement;
  this.photosСounterElement = photosСounterElement;
};

module.exports = Gallery;
