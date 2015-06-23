muniButlerApp.controller('HomeController', function($scope, User, $location, Autocomplete, FiveEleven) {

  // user object to store info related to this user

  // prevent searching through pressing enter
  $scope.enter = false;
  // hide when routes are available
  $scope.newroute = false;
  $scope.msg = "Add new route!";

  $scope.msgChange = function(){
    if ($scope.newroute) $scope.msg = "Cancel";
    else $scope.msg = "Add new route!";
  }; 

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
    User.trip = { to: $scope.user.to, from: $scope.user.from };
    $location.path('/routes');
    // call factory function with user's home and work addresses
    // to get directions from Google Maps API  
  };

  $scope.routes = User.routes;

  Autocomplete.initialize($scope);
});