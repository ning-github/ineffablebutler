muniButlerApp.controller('HomeController', function($scope, User, $location, Autocomplete, GoogleMaps, FiveEleven) {

  // user object to store info related to this user

  // prevent searching through pressing enter
  $scope.enter = false;
  // hide when routes are available
  $scope.newroute = false;
  $scope.msg = "Add new route!";
        
  $scope.setMap = function(location){
    var directionsDisplay = GoogleMaps.createDirectionsRendererObject();

    var mapOptions = {
      zoom: 18,
      center: location
    };

    var map = new google.maps.Map(document.getElementById('routes-map'), mapOptions);

    directionsDisplay.setMap(map);
  };

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

    $scope.setMap(latlng);
  }
  function error() {
    console.log('Geolocation failed');
    $scope.setMap(new google.maps.LatLng(37.7837235,-122.4089778));
  }

  $scope.submit = function(validation){
    console.log('in submit funciton')
    if (!validation) return;
    User.trip = { to: $scope.user.to, from: $scope.user.from };
    $location.path('/routes');
    // call factory function with user's home and work addresses
    // to get directions from Google Maps API  
  };

  $scope.routes = User.routes;

  Autocomplete.initialize($scope);
});