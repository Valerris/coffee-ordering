/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
/*jslint node:true */
/*jshint esversion: 6 */
(function(window) {
  "use strict";
  var App = window.App || {},
      Promise = window.Promise;

  function DataStore() {
    this.data = {};
  }

  function promiseResolvedWith(value){
    return new Promise(function(resolve, reject){
      resolve(value);
    });
  }

  DataStore.prototype.add = function(key, val) {
    return promiseResolvedWith(null);
  };

  DataStore.prototype.get = function(key){
    return promiseResolvedWith(this.data[key]);
  };

  DataStore.prototype.getAll = function(){
    return promiseResolvedWith(this.data);
  };

  DataStore.prototype.remove = function(key){
    delete this.data[key];

    return promiseResolvedWith(null);
  };

  App.DataStore = DataStore;
  window.App = App;
})(window);
