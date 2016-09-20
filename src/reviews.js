'use strict';

var load = require('./load');
var nodesEach = require('./nodesEach');
var getReviewElement = require('./review');
var Review = require('./review-constructor');
var filters = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');
var getMoreButton = document.querySelector('.reviews-controls-more');

var REVIEWS_URL = '/api/reviews';
var PAGE_SIZE = 3;
var fromLoadIndex = 0;
var toLoadIndex = PAGE_SIZE;

var reviewsConfig = {
  from: fromLoadIndex,
  to: toLoadIndex,
  filter: null
};

var increasingCounters = function() {
  reviewsConfig.from += PAGE_SIZE;
  reviewsConfig.to += PAGE_SIZE;
};

var hideFilters = function() {
  filters.classList.add('invisible');
};

var showFilters = function() {
  filters.classList.remove('invisible');
};

var hideGetMoreButton = function() {
  getMoreButton.classList.add('invisible');
};

var showGetMoreButton = function() {
  getMoreButton.classList.remove('invisible');
};

var clearCounters = function() {
  reviewsConfig.from = fromLoadIndex;
  reviewsConfig.to = toLoadIndex;
};

var renderReviews = function(data) {
  data.forEach(function(reviewData) {
    var reviewElement = getReviewElement(reviewData);
    var review = new Review(reviewData, reviewElement);
    reviewsContainer.appendChild(review.element);
  });
};

var removeAllReviews = function() {
  var reviews = reviewsContainer.querySelectorAll('.review');

  nodesEach(reviews, function(review) {
    reviewsContainer.removeChild(review);
  });
};

var preloadReviews = function() {
  hideFilters();
  load(REVIEWS_URL, reviewsConfig, function(data) {
    renderReviews(data);
    showFilters();
    showGetMoreButton();
  });
};

var onClickGetMore = function() {
  increasingCounters();
  load(REVIEWS_URL, reviewsConfig, function(data) {
    renderReviews(data);
    if (data.length < 3) {
      hideGetMoreButton();
    }
  });
};

var saveFilter = function(id) {
  localStorage.setItem('filter', id);
};

var restoreFilter = function() {
  var savedFilterID = localStorage.getItem('filter');
  if (savedFilterID && savedFilterID !== 'reviews-all') {
    document.querySelector('#' + savedFilterID).click();
  } else {
    preloadReviews();
  }
};

var onChangeFilter = function(evt) {
  var target = evt.target;
  var filterId = target.id;

  saveFilter(filterId);
  reviewsConfig.filter = filterId;
  clearCounters();
  removeAllReviews();
  load(REVIEWS_URL, reviewsConfig, function(data) {
    renderReviews(data);
    showGetMoreButton();
  });
};


getMoreButton.addEventListener('click', onClickGetMore);
filters.addEventListener('change', onChangeFilter, true);
restoreFilter();
