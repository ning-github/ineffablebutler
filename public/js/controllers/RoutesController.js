muniButlerApp.controller('RoutesController', function($scope, $http, $location, User, GoogleMaps, FiveEleven){

  $scope.user = {};
  $scope.user.trip = User.trip;
  $scope.user.routeHeading = User.routeHeading;
  $scope.user.going = true;
  $scope.user.routeHeading = "Departure Route";
  $scope.user.returning = false;
  $scope.user.routeOptions;
  $scope.user.route = {
    from: User.trip.from,
    to: User.trip.to,
    route: ''
  };

  if (!$scope.user.route.to || !$scope.user.route.from){
    $location.path('/');
  }

  $scope.user.getRouteBack = function(){
    $scope.user.getRouteOptions(User.trip['to'], User.trip['from']);
  };


  $scope.user.selectRoute = function(busNumber, stopName){
    console.log(busNumber, stopName);

    if ($scope.user.going && !$scope.user.returning){
      $scope.user.routeHeading = "Departure Route";
      $scope.user.route.route = [busNumber, stopName];

      User.addRoute($scope.user.route);

      $scope.user.routeHeading = "Return Route";
      $scope.user.going = false;
      $scope.user.returning = true;

      $scope.user.getRouteBack();

    } else if (!$scope.user.going && $scope.user.returning){
      $scope.user.route.route = [busNumber, stopName];

      User.addRoute($scope.user.route);

      $scope.user.returning = false;
      $scope.user.going = true;

      $location.path('/');

    }
    
  };

  $scope.user.getRouteOptions = function(from, to){
    var directions =  GoogleMaps.createDirectionsService();
    var directionsRequest = GoogleMaps.getDirectionsRequestObject(from, to);
    var directionsDisplay = GoogleMaps.createDirectionsRendererObject();

    var mapOptions = {
      zoom: 18,
      center: new google.maps.LatLng(37.783724,-122.408978)
    };

    var map = new google.maps.Map(document.getElementById('routes-map'), mapOptions);

    directionsDisplay.setMap(map);

    directions.route(directionsRequest, function(results, status){
      if (!status === "OK"){
        throw status;
      }
      console.log(results);

      directionsDisplay.setDirections(results);

      var options = {};
      options.numRoutes = results.routes.length;
      options.routes = [];

      // iterate through possible routes to take
      for (var i = 0; i < results.routes.length; i++){

        // create an object to store all info related to this route
        // it will be added to the options object
        var route = {};

        // define the array to store tuples of bus line numbers and stop names for the given route
        route.lines = [];

        // add route duration to route object
        route.duration = results.routes[i].legs['0'].duration.text;

        // define a steps variable for readibility for iterating over
        var steps = results.routes[i].legs['0'].steps;

        // iterate over the steps in each route to find the bus line(s)
        // in the given route option and the direction (inbound or outbound)
        for (var key in steps){
          if (steps[key].travel_mode === "TRANSIT"){
            // the busNumber is called the short_name in Google's results object
            var busNumber = results.routes[i].legs['0'].steps[key].transit.line.short_name;
            var stopName = results.routes[i].legs['0'].steps[key].transit.departure_stop.name;

            var arrivalLocation = results.routes[i].legs['0'].steps[key].transit.arrival_stop.location.F;
            var departureLocation = results.routes[i].legs['0'].steps[key].transit.departure_stop.location.F;

            console.log(arrivalLocation);
            console.log(departureLocation);

            if (arrivalLocation > departureLocation){
              var direction = "Inbound";
            } else {
              var direction = "Outbound";
            }

            route.lines.push([busNumber, stopName, direction]);
          }
        }



        console.log(route)

        // get arrival times for the route options
        $http.post('/route/times', {busNumber: busNumber, stopName: stopName, direction: direction})
          .success(function(data, status, headers, config) {
              // this callback will be called asynchronously
              // when the response is available
              console.log('SUCCESS: ', data);
            })
          .error(function(data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              console.log('ERROR: ', data);
            });

        // add route to options routes array
        options.routes.push(route);
      }
      
      $scope.user.routeOptions = options;
      $scope.$apply();      
    });
  }; // end of getRouteOptions

  $scope.user.getRouteOptions(User.trip['from'], User.trip['to']);

}); //end of routes controller