'use strict';

var templateElement = document.querySelector('#review-template');
var elementToClone;
var IMAGE_LOAD_TIMEOUT = 10000;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

var getReviewElement = function(review) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-text').textContent = review.description;
  var reviewRatingElement = element.querySelector('.review-rating');
  console.log(review.rating);
  switch (review.rating) {
    case 2:
      reviewRatingElement.classList.add('review-rating-two');
      break;
    case 3:
      reviewRatingElement.classList.add('review-rating-three');
      break;
    case 4:
      reviewRatingElement.classList.add('review-rating-four');
      break;
    case 5:
      reviewRatingElement.classList.add('review-rating-five');
      break;
  }

  var image = new Image();
  var imageLoadTimeout;
  image.onload = function(evt) {
    clearTimeout(imageLoadTimeout);
    var reviewImageElement = element.querySelector('.review-author');
    reviewImageElement.src = evt.target.src;
    reviewImageElement.title = review.author.name;
    reviewImageElement.width = 124;
    reviewImageElement.height = 124;
  };
  image.onerror = function() {
    element.classList.add('review-load-failure');
  };
  image.src = review.author.picture;
  imageLoadTimeout = setTimeout(function() {
    image.src = '';
    element.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);
  return element;
};

module.exports = getReviewElement;
