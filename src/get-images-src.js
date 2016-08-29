'use strict';

var getImagesSrc = function(images) {
  var imagesArr = [];
  [].forEach.call(images, function(image) {
    imagesArr.push(image.src);
  });
  return imagesArr;
};

module.exports = getImagesSrc;
