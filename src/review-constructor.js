'use strict';

var Review = function(data, element) {
  var self = this;
  this.data = data;
  this.element = element;
  this.answersElements = this.element.querySelectorAll('.review-quiz-answer');

  [].forEach.call(this.answersElements, function(button, index, buttons) {
    button.onclick = function() {
      self.onQuizAnswerClick(buttons, index);
    };
  });

  this.removeControlListeners = function() {
    [].forEach.call(this.answersElements, function(button) {
      button.onclick = null;
    });
  };
};

Review.prototype.onQuizAnswerClick = function(buttons, currentButton) {
  [].forEach.call(buttons, function(button) {
    button.classList.remove('review-quiz-answer-active');
  });
  buttons[currentButton].classList.add('review-quiz-answer-active');
};

module.exports = Review;
