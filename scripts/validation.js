/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
/*jslint node:true */
/*jshint esversion: 6 */
"use strict";

(function(window){
  var App = window.App || {};

  var Validation = {
    isCompanyEmail: function(email){
      return /.+@coffeebean\.com$/.test(email);
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
