muniButlerApp.factory('Autocomplete', function () {
  // factory for autocomplete
  // author: Albert Tang

  // add listener events to DOM elements for autocomplete
  var initialize = function (scope) {
    var from = new google.maps.places.Autocomplete((document.getElementsByClassName('autocomplete')[0]));
    var to = new google.maps.places.Autocomplete((document.getElementsByClassName('autocomplete')[1]));
    google.maps.event.addListener(from, 'place_changed', function () {
      scope.user.from = from.getPlace().formatted_address;
    });
    google.maps.event.addListener(to, 'place_changed', function () {
      scope.user.to = to.getPlace().formatted_address;
    });
  };

  return {
    initialize: initialize
  };
});