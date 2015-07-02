/*
 ** RoutesController.js
 ** Logic used for displaying a user's route options and handling selections.
 ** 
 ** Authors: Danielle Knudson, Albert Tang
 */

muniButlerApp.controller('RoutesController', function ($scope, $location, $timeout, User, GoogleMaps, Bus) {
  
  /**************
   ** VARIABLES **
   ***************/
  
  $scope.model = {
    trip: User.trip,
    going: true,
    returning: false,
    routeHeading: 'Departure Route',
    routeOptions: [],
    route: {
      from: User.trip.from,
      to: User.trip.to,
      route: ''
    }
  };

  /**************
   ** FUNCTIONS **
   ***************/

  $scope.model.showRoute = function (routeIndex) {
    if (routeIndex !== GoogleMaps.directionsDisplay.routeIndex) {
      GoogleMaps.directionsDisplay.setRouteIndex(routeIndex);
    }
  };


  // Handles a route selection (click event) on routes.html
  // Will save the departure/return route for the user
  // Redirects to home.html
  $scope.model.selectRoute = function (route) {
    console.log('SELECTED ROUTE IN ROUTES CONTROLLER:', route);

    // var busNumber = route.lines[0][0];
    var busNumber = [];

    for (var i = 0; i < route.lines.length; i++) {
      busNumber.push(route.lines[i]);
    }

    var stopName = route.lines[0][1];
    var duration = route.duration;
    var arrivalTimes = route.arrivalTimes;

    // the user hasn't selected a departure route
    if ($scope.model.going && !$scope.model.returning) {
      $scope.model.routeHeading = "Departure Route";
      $scope.model.route.route = [busNumber, stopName, duration, arrivalTimes];
      User.addRoute($scope.model.route, route.googleRouteObj);
      // change heading for when the user selects return route following
      // the selection of the departure route
      $scope.model.routeHeading = "Return Route";
      $scope.model.going = false;
      $scope.model.returning = true;
      // get the route options for the returning route
      // by flipping the departure/destination addresses

      GoogleMaps.getRouteOptions(User.trip['to'], User.trip['from']).then(function (routes) {
        $scope.model.routeOptions = routes;
        Bus.getBusesArrivalTimes(routes); 
      }, function (error) {
        console.log('Failed: ' + error);
      });

      // the user has selected the departure and is now selecting the return route
    } else if (!$scope.model.going && $scope.model.returning) {
      $scope.model.route.route = [busNumber, stopName, duration, arrivalTimes];

      // flip to and from to for saving return route
      var temp = $scope.model.route.from;
      $scope.model.route.from = $scope.model.route.to;
      $scope.model.route.to = temp;

      // add return route
      User.addRoute($scope.model.route, route.googleRouteObj);

      // reset to and from back to original state
      $scope.model.route.from = User.trip.from;
      $scope.model.route.to = User.trip.to;

      // reset variables so that the user can select 
      // the departure route for the next route entered on home.html
      $scope.model.returning = false;
      $scope.model.going = true;
      // redirect the user to home.html after selecting the return route
      $location.path('/');
    }
  };

  /**************
   **** LOGIC ****
   ***************/

  // If the user hasn't entered a departure or destination route,
  // the user should be redirected to the home page 
  if (!$scope.model.route.to || !$scope.model.route.from) {
    $location.path('/');
  }
  // If the user has departure and destinate addresses, get the route
  // options for the departure route
  $timeout(function(){
    GoogleMaps.getRouteOptions(User.trip.from, User.trip.to).then(function (routes) {
      $scope.model.routeOptions = routes;
      Bus.getBusesArrivalTimes(routes); 
    }, function (error) {
      console.log('Failed: ' + error);
    });
  });
  // Update the bus arrival times every second
}); //end of RoutesController

