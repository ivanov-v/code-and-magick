'use strict';

var filters = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('#review-template');
var elementToClone;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

var reviews;
window.getData = function(data) {
  reviews = data;
};

var addScript = function(url, callback) {
  var script = document.createElement('script');
  script.src = url;
  script.onload = callback;
  document.body.appendChild(script);
};

var hideFilters = function() {
  filters.classList.add('invisible');
};

var showFilters = function() {
  filters.classList.remove('invisible');
};

var IMAGE_LOAD_TIMEOUT = 10000;

var getReviewElement = function(review, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-text').textContent = review.description;
  element.querySelector('.review-rating').textContent = review.rating;
  container.appendChild(element);

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

var initReviews = function() {
  hideFilters();

  addScript('http://localhost:1506/api/reviews?callback=getData', function() {
    reviews.forEach(function(review) {
      getReviewElement(review, reviewsContainer);
    });
  });

  showFilters();
};

initReviews();
