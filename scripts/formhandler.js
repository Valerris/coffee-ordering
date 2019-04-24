/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
/*jslint node:true */
/*jshint esversion: 6 */
"use strict";

(function (window){
  var App = window.App || {},
  $ = window.jQuery;

  function FormHandler(selector){
    if(!selector) throw new Error('No selector provided.');

    this.$formElement = $(selector);
    if(this.$formElement.length === 0) throw new Error('Could not find element with selector: ' + selector);
  }

  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event){
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item){
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      fn(data)
        .then(function(){
          this.reset();
          this.elements[0].focus();
        }.bind(this));
    });
  };

  FormHandler.prototype.addInputHandler = function (fn) {
    console.log('Setting input handler for form');
    this.$formElement.on('input', '[name="emailAddress"]', function(event){
      var emailAddress = event.target.value;
      var message = '';
      if(fn(emailAddress))
        event.target.setCustomValidity('');
      else {
        message = emailAddress + ' is not an authorized email address!';
        event.target.setCustomValidity(message);
      }
    });
  };

  FormHandler.prototype.addChangeHandler = function () {
    console.log('Setting onchange handler for form');
    this.$formElement.on('change', '[name="strength"]' , function(event){
      event.preventDefault();
      var value = event.target.value;
      var rating = $(this).next();

      if(+value <= 30) rating.val(value).css("color", 'green');
      if(+value > 30 && value < 70) rating.val(value).css("color", 'orange');
      if(+value >= 70) rating.val(value).css("color", 'red');
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
