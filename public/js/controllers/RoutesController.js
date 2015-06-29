/*
 ** RoutesController.js
 ** Logic used for displaying a user's route options and handling selections.
 ** 
 ** Authors: Danielle Knudson, Albert Tang
 */

muniButlerApp.controller('RoutesController', function ($scope, $http, $location, User, GoogleMaps, FiveEleven, $timeout) {

  /**************
   ** VARIABLES **
   ***************/

  $scope.model = {
    trip: User.trip,
    going: true,
    returning: false,
    routeHeading: 'Departure Route',
    routeOptions: {},
    route: {
      from: User.trip.from,
      to: User.trip.to,
      route: ''
    }
  };

  /**************
   ** FUNCTIONS **
   ***************/

  // Makes a POST request to the server to get XML data from 511 API which gets bus times
  var getBusArrivalTimes = '',
    // Traverses XML data returned from server which holds bus arrival times  
    traverseXML = '';

  // Gets route options for the departure/destination addresses provided on home.html
  // using Google Maps API V3 and Google Maps Direction Service
  $scope.model.getRouteOptions = '';

  // Handles a route selection (click event) on routes.html
  // Will save the departure/return route for the user
  // Redirects to home.html
  $scope.model.selectRoute = '';

  getBusArrivalTimes = function () {
    // Check to make sure the user has routes to get bus arrival times for
    if ($scope.model.routeOptions === undefined) {
      return;
    }

    // Add arrival time info to each route
    angular.forEach($scope.model.routeOptions.routes, function (route, i, obj) {

      // Request route times for the bus from server
      $http.post('/route/times', {
          busNumber: route.lines[0][0],
          stopName: route.lines[0][1],
          direction: route.lines[0][2]
        }).success(function (data) {
          // Traverse the XML data response from the server to get bus arrival times
          var busTimes = traverseXML(data.xml, data.busNumber, data.direction, data.stopName);

          // Add the bus arrival times to the given route object to be displayed in routes.html
          $scope.model.routeOptions.routes[i].arrivalTimes = busTimes;
        })
        .error(function (data, status, headers, config) {
          throw 'ERROR: ' + data;
        });
    });
  };

  $scope.model.selectRoute = function (busNumber, stopName, duration, arrivalTimes) {

    // the user hasn't selected a departure route
    if ($scope.model.going && !$scope.model.returning) {
      $scope.model.routeHeading = "Departure Route";
      $scope.model.route.route = [busNumber, stopName, duration, arrivalTimes];

      User.addRoute($scope.model.route);

      // change heading for when the user selects return route following
      // the selection of the departure route
      $scope.model.routeHeading = "Return Route";
      $scope.model.going = false;
      $scope.model.returning = true;

      // get the route options for the returning route
      // by flipping the departure/destination addresses
      $scope.model.getRouteOptions(User.trip['to'], User.trip['from']);

      // the user has selected the departure and is now selecting the return route
    } else if (!$scope.model.going && $scope.model.returning) {

      $scope.model.route.route = [busNumber, stopName, duration, arrivalTimes];
      User.addRoute($scope.model.route);

      // reset variables so that the user can select 
      // the departure route for the next route entered on home.html
      $scope.model.returning = false;
      $scope.model.going = true;

      // redirect the user to home.html after selecting the return route
      $location.path('/');
    }

  };

  traverseXML = function (xml, busNumber, direction, stopName) {

    // variable which will hold the next arrival times of the bus
    var times = [];

    // variables used to create an XML DOM object so that the XML can be traversed
    var parser, xmlDoc;

    // turn XML into XML DOM object
    if (window.DOMParser) {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(xml, "text/xml");
    } else {
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = "false";
      xmlDoc.loadXML(xml);
    }

    // recursive function which traverses the XML DOM object
    var crawl = function (element) {

      // BASE CASE TO STOP RECURSION
      // The node we want to first look in is <Route>
      if (element.tagName === "Route") {
        if (element.getAttribute("Code") === busNumber) {

          // get <routeDirectionList>, which is a child of <Route>
          var routeDirectionList = element.children[0];
          // get <route Direction>, which is a child of <routeDirectionList>
          var routeDirection = routeDirectionList.children[0];

          // if the <routeDirection>'s "Code" attribute matches the direction 
          // parameter passed to traverseXML()
          if (routeDirection.getAttribute("Code") === direction) {

            // get <stopList>, which is a child of <routeDirection>
            var stopList = routeDirection.children[0];
            // get <stop>, which is a child of <stopList>
            var stop = stopList.children[0];

            // if the <stop> "name" attribute mates the stopName
            // parameter passed to traverseXML()
            if (stop.getAttribute("name") === stopName) {

              // get <departureList>, which is a child of <stop>
              var departureList = stop.children[0];

              // iterate throught <departureList>'s children to get the next arrival times
              for (var j = 0; j < departureList.children.length; j++) {
                times.push(departureList.children[j].innerHTML);
              } // end of looping through departure times
            } // end of stopName check
          } // end of direction check
        } // end of busNumber check 
      } // end of if Route element check

      // traverse XML document
      if (element.children.length > 0) {
        for (var i = 0; i < element.children.length; i++) {
          crawl(element.children[i]);
        }
      }
    };

    // xmlDoc should start at xmlDoc.children[0].children[0] 
    // because of how the XML is structured
    crawl(xmlDoc.children[0].children[0]);

    // return the bus arrival times 
    return times;
  };

  $scope.model.getRouteOptions = function (from, to) {

    // Create Google Maps Direction Service object
    var directions = GoogleMaps.createDirectionsService(),
      // Create the Directions Request Object needed to request directions from Google Maps API 
      directionsRequest = GoogleMaps.getDirectionsRequestObject(from, to),
      // Create the Google Maps Directions Renderer object which will be used to display 
      // directions results on the map of routes.html
      directionsDisplay = GoogleMaps.createDirectionsRendererObject(),
      // Create the map options object to set map settings
      mapOptions = {
        zoom: 18,
        center: new google.maps.LatLng(37.783724, -122.408978)
      },
      // Create the map with the mapOptions object
      map = new google.maps.Map(document.getElementById('routes-map'), mapOptions);

    directionsDisplay.setMap(map);

    // Make the call to get the route options from Google Maps API 
    directions.route(directionsRequest, function (results, status) {

      if (!status === "OK") {
        throw status;
      }

      // render the directions on the map
      directionsDisplay.setDirections(results);

      // create an options obj to store direction options returned by Google
      var options = {};
      // array to store all possible direction route objects
      options.routes = [];

      // iterate through possible routes to take
      angular.forEach(results.routes, function (route, index, obj) {
        // create an object to store all info related to this route
        // it will be added to the options.routes array
        var routeObj = {};

        // define the array to store tuples of bus line numbers, stop names, and directions 
        // for the given route
        routeObj.lines = [];
        routeObj.duration = route.legs['0'].duration.text;

        // iterate over the steps in each route to find the bus line(s)
        // in the given route option and the direction (inbound or outbound)
        var steps = route.legs['0'].steps;

        for (var key in steps) {
          if (steps[key].travel_mode === "TRANSIT") {

            var busNumber = route.legs['0'].steps[key].transit.line.short_name,
                stopName = route.legs['0'].steps[key].transit.departure_stop.name;

            // Find out if the bus is heading 'Inbound' or 'Outbound'
            var arrivalLocation = route.legs['0'].steps[key].transit.arrival_stop.location.F
                departureLocation = route.legs['0'].steps[key].transit.departure_stop.location.F,
                direction = '';

            if (arrivalLocation > departureLocation) {
              direction = "Inbound";
            } else {
              direction = "Outbound";
            }

            // Check to make sure only steps involving busses are added to the route.lines array
            // This is to prevent adding a "WALKING" travel_mode route to the route.lines array
            if (busNumber) {
              routeObj.lines.push([busNumber, stopName, direction]);
            }
          }
        }
        // Add route object to options.routes array
        options.routes.push(routeObj);
      });

      // Set the user's routeOptions so they are reflected in routes.html
      $scope.model.routeOptions = options;
      $scope.$apply();
    });

    // Update the bus arrival times every second
    $timeout(getBusArrivalTimes, 1000);
  }; // end of getRouteOptions

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
  $scope.model.getRouteOptions(User.trip.from, User.trip.to);

}); //end of RoutesController