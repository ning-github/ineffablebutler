muniButlerApp.controller('HomeController', function ($scope, $location, User, Autocomplete, GoogleMaps) {
  // controller for the home page
  // author: Albert Tang

  // grab any saved route information from the User factory
  $scope.routes = User.routes;
  $scope.empty = Object.keys(User.routes).length === 0;

  // does the user want to add a new route?
  $scope.addnewroute = false;

  $scope.showMap = true;

  // button text
  $scope.msg = "Add new route!";
  $scope.msgChange = function () {
    if ($scope.addnewroute) { $scope.msg = "Cancel"; }
    else { $scope.msg = "Add new route!"; }
  };

  // object for temporary user information
  $scope.user = {
    from: "Finding current location..."
  };

  // has the autocomplete updated the input values?
  $scope.enter = false;
  // submit function
  $scope.submit = function (validation) {
    if (!validation) { return; }
    // update User information in the User factory
    User.trip = {
      to: $scope.user.to,
      from: $scope.user.from
    };
    // the RoutesController at /routes will handle this information
    $location.path('/routes');
  };

  $scope.remove = function(route){
    console.log(route);
    User.removeRoute(route.id);
  };

  // change latitude/longitude into actual addresses and update the from address
  function success(position) {
    var pos;
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    geocoder.geocode({
      'location': latlng
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        pos = results[0].formatted_address;
        $scope.user.from = pos;
        $scope.$apply();
      }
    });
    $scope.setMap(latlng);
  }

  function error() {
    console.log('Geolocation failed');
    $scope.setMap(new google.maps.LatLng(37.7837235, -122.4089778));
  }

  // use the GoogleMaps factory to update the map
  $scope.setMap = function (location) {
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
      zoom: 18,
      center: location
    };
    var map = new google.maps.Map(document.getElementById('routes-map'), mapOptions);
    directionsDisplay.setMap(map);
  };

  $scope.showOptions = function(savedRoute) {
    console.log('THE SAVED ROUTE IS AS FOLLOWS: ', savedRoute);
    var googleFormattedObject = {request: {travelMode: "TRANSIT"}, routes: [savedRoute.googleRouteObj]};

    var mapOptions = {
      zoom: 18,
      center: new google.maps.LatLng(37.783724, -122.408978)
    };

    $scope.showMap = true;

    // Create the map with the mapOptions object and render
    GoogleMaps.resetMap();
    GoogleMaps.renderNewMap(googleFormattedObject);
  };

  // =================================
  //   FUNCTIONS THAT RUN ON LOAD
  // =================================

  // use the Autocomplete factory to set up autocomplete
  Autocomplete.initialize($scope);

  // use HTML5 to find the current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }

});

// .directive('change-color', function(){
//   return {
//     restrict: 'E',
//     scope: {
//       data: '='
//     },
//     link: function(scope, elem, attrs){
//       a = d3.select(elem[0]);
//       scope.$watch('data', function(){
//         updateGraph();
//       });

//       function updateGraph() {
//           var green = "#00ff00";
//           var yellow = "#ffff00";
//           var red = "#ff0000";

//           var textFromNode = document.getElementsByClassName('duration');
//           var minutes = +textFromNode[0].textContent.split(' ')[0];

//           var colorScale = d3.scale.linear()
//             .domain([0, 20, 40])
//             .range([green, yellow, red]);

//           a.selectAll('.duration')
//             .style('color', colorScale(minutes));
//       }
//     }
//   }
// });

