'use strict';

var load = require('./load');
var getReviewElement = require('./review');

var filters = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');

hideFilters();

load('http://localhost:1506/api/reviews?callback=getData', function() {
  window.reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
});

showFilters();

function showFilters() {
  filters.classList.add('invisible');
}

function hideFilters() {
  filters.classList.remove('invisible');
}
