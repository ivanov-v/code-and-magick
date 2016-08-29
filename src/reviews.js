'use strict';

var load = require('./load');
var getReviewElement = require('./review');
var filters = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');

var hideFilters = function() {
  filters.classList.add('invisible');
};

var showFilters = function() {
  filters.classList.remove('invisible');
};

hideFilters();

load('http://localhost:1506/api/reviews?callback=getData', function() {
  window.reviews.forEach(function(review) {
    console.log(review);
    getReviewElement(review, reviewsContainer);
    showFilters();
  });
});
