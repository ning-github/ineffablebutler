muniButlerApp.controller('RoutesController', function($scope, $location, User, GoogleMaps, FiveEleven){

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

    directions.route(directionsRequest, function(results, status){
      if (!status === "OK"){
        throw status;
      }
      // $scope.user.routeOptions =  $scope.user.handleResults(results);

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
        // in the given route option
        for (var key in steps){
          if (steps[key].travel_mode === "TRANSIT"){
            // the busNumber is called the short_name in Google's results object
            var busNumber = results.routes[i].legs['0'].steps[key].transit.line.short_name;
            var stopName = results.routes[i].legs['0'].steps[key].transit.departure_stop.name;
            route.lines.push([busNumber, stopName]);
          }
        }

        // add route to options routes array
       options.routes.push(route);
      }
      
      $scope.user.routeOptions = options;
      $scope.$apply();
      console.log($scope.user.routeOptions);
      
    });
  }; // end of getRouteOptions

  $scope.user.getRouteOptions(User.trip['from'], User.trip['to']);

}); //end of routes controller