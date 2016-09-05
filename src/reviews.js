'use strict';

var load = require('./load');
var getReviewElement = require('./review');
var Review = require('./review-constructor');
var filters = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');

var hideFilters = function() {
  filters.classList.add('invisible');
};

var showFilters = function() {
  filters.classList.remove('invisible');
};

hideFilters();

load('http://localhost:1506/api/reviews', { from: 2, to: 5 }, function(response) {
  var data = JSON.parse(response);

  data.forEach(function(reviewData) {
    var reviewElement = getReviewElement(reviewData);
    var review = new Review(reviewData, reviewElement);
    reviewsContainer.appendChild(review.element);
  });

  showFilters();
});
