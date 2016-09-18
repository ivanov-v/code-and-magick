'use strict';

var nodesEach = require('./nodesEach');

var Review = function(data, element) {
  this.data = data;
  this.element = element;
  this.answersButtons = this.element.querySelectorAll('.review-quiz-answer');
  this.onAnswerClick = this.onAnswerClick.bind(this);
  this.init();
};

Review.prototype.onAnswerClick = function(evt) {
  if (!evt.target.classList.contains('review-quiz-answer')) {
    return;
  }
  nodesEach(this.answersButtons, function(button) {
    button.classList.remove('review-quiz-answer-active');
  });
  evt.target.classList.add('review-quiz-answer-active');
};

Review.prototype.init = function() {
  this.element.addEventListener('click', this.onAnswerClick);
};

Review.prototype.destroy = function() {
  this.element.removeEventListener('click', this.onAnswerClick);
};

module.exports = Review;
