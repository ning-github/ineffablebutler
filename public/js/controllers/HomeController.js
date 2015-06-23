muniButlerApp.controller('HomeController', function($scope, User, $location, Autocomplete, FiveEleven) {

  // user object to store info related to this user

  // prevent searching through pressing enter
  $scope.enter = false;

  $scope.user = {
    from: "Finding current location..."
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(position) {
    var pos;
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    geocoder.geocode({'location':latlng}, function(results,status){
      if (status == google.maps.GeocoderStatus.OK){
        pos = results[0].formatted_address;
        $scope.user.from = pos;
        $scope.$apply();
      }
    });
  }
  function error() {
    console.log('Geolocation failed');
  }

  $scope.submit = function(validation){
    if (!validation) return;

    User.addRoute($scope.user.to,$scope.user.from);
    $location.path('/routes');
    // call factory function with user's home and work addresses
    // to get directions from Google Maps API  
  };

  $scope.routes = User.routes;
  $scope.test = function(){
    console.log($scope.routes);
  };

  Autocomplete.initialize($scope);
});