'use strict';

var browserCookies = require('browser-cookies');

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var formElem = document.querySelector('.review-form');
  var formRatingElems = formElem.querySelectorAll('input[name="review-mark"]');
  var formNameField = formElem.querySelector('#review-name');
  var formReviewField = formElem.querySelector('#review-text');
  var formSubmitBtn = formElem.querySelector('.review-submit');
  var formNameLabel = formElem.querySelector('.review-fields-name');
  var formReviewLabel = formElem.querySelector('.review-fields-text');
  var formReviewFields = formElem.querySelector('.review-fields');

  var form = {
    onClose: null,

    rating: null,

    minRating: 3,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },

    setRating: function() {
      [].forEach.call(formRatingElems, function(star) {
        if (star.checked) {
          form.rating = star.value;
        }
      });
    },

    isRatingNormal: function() {
      return form.rating >= form.minRating;
    },

    isNameSet: function() {
      return formNameField.value !== '' ? true : false;
    },

    isReviewSet: function() {
      return formReviewField.value !== '' ? true : false;
    },

    enable: function() {
      formSubmitBtn.disabled = false;
    },

    disable: function() {
      formSubmitBtn.disabled = true;
    },

    hide: function(elem) {
      elem.style.display = 'none';
    },

    show: function(elem) {
      elem.removeAttribute('style');
    },

    validate: function() {
      form.setRating();

      if (form.isNameSet()) {
        form.hide(formNameLabel);
      } else {
        form.show(formNameLabel);
      }

      if (form.isRatingNormal()) {
        form.hide(formReviewLabel);
        if (form.isNameSet()) {
          form.hide(formReviewFields);
          form.enable();
        } else {
          form.show(formReviewFields);
          form.disable();
        }
      } else {
        if (form.isReviewSet()) {
          form.hide(formReviewLabel);
        } else {
          form.show(formReviewLabel);
        }
        if (form.isNameSet() && form.isReviewSet()) {
          form.hide(formReviewFields);
          form.enable();
        } else {
          form.show(formReviewFields);
          form.disable();
        }
      }
    },

    getCookiesExpiresDays: function(year, month, day) {
      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var birthday = new Date(currentYear, month - 1, day);
      var lastBirthday = birthday;
      if (birthday > currentDate) {
        lastBirthday = new Date(currentYear - 1, month - 1, day);
      }
      var days = Math.floor((currentDate - lastBirthday) / 1000 / 60 / 60 / 24);
      return days;
    },

    setCookies: function() {
      browserCookies.defaults.expires = form.getCookiesExpiresDays();
      browserCookies.set('review-mark', form.rating);
      browserCookies.set('review-name', formNameField.value);
    }
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  formNameField.oninput = function() {
    form.validate();
  };

  formReviewField.oninput = function() {
    if (!form.isRatingNormal()) {
      form.validate();
    }
  };

  [].forEach.call(formRatingElems, function(star) {
    star.onchange = function() {
      form.validate();
    };
  });

  formElem.onsubmit = form.setCookies;

  form.validate();

  return form;
})();
