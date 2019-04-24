(function(window) {
  "use strict";
  var App = window.App,
    Truck = App.Truck,
    DataStore = App.DataStore,
    RemoteDataStore = App.RemoteDataStore,
    FormHandler = App.FormHandler,
    Validation = App.Validation,
    CheckList = App.CheckList,
    FORM_SELECTOR = '[data-coffee-order="form"]',
    CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]',
    SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';

  // var remoteDS = new RemoteDataStore(SERVER_URL);

  //было:
  var myTruck = new Truck('ncc-1701', new DataStore());
  //стало:
  // var myTruck = new Truck('ncc-1701', remoteDS);
  //
  window.myTruck = myTruck;

  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(function(data) {
    return myTruck.createOrder.call(myTruck, data)
      .then(function() {
        checkList.addRow.call(checkList, data);
      });
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);
  formHandler.addChangeHandler();

  myTruck.printOrders(checkList.addRow.bind(checkList));

  //console.log(formHandler);
})(window);
