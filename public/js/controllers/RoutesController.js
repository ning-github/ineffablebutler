muniButlerApp.controller('RoutesController', function($scope, User, GoogleMaps){

  $scope.user = {};
  $scope.user.username = User.username;
  $scope.user.firstName = User.firstName;
  $scope.user.newRouteAddresses = User.newRouteAddresses;
  $scope.user.routeOptions;

  $scope.user.handleResults = function(results){

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
    return options;
  };

  $scope.user.getRouteOptions = function(){
    var directions =  GoogleMaps.createDirectionsService();
    var directionsRequest = GoogleMaps.getDirectionsRequestObject(User.newRouteAddresses['from'], User.newRouteAddresses['to']);

    directions.route(directionsRequest, function(results, status){
      if (!status === "OK"){
        throw status;
      }
      $scope.user.routeOptions =  $scope.user.handleResults(results);
      console.log($scope.user.routeOptions)
    });
  }; // end of getRouteOptions

  $scope.user.getRouteOptions();

  console.log($scope.user.routeOptions);

}); //end of routes controller