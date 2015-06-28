muniButlerApp.controller('RoutesController', function($scope, $http, $location, User, GoogleMaps, FiveEleven, $timeout){

  $scope.user = {};
  $scope.user.trip = User.trip;
  $scope.user.routeHeading = User.routeHeading;
  $scope.user.going = true;
  $scope.user.routeHeading = "Departure Route";
  $scope.user.returning = false;
  $scope.user.routeOptions = {};
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


  $scope.user.selectRoute = function(busNumber, stopName, duration, arrivalTimes){
    

    if ($scope.user.going && !$scope.user.returning){
      $scope.user.routeHeading = "Departure Route";
      $scope.user.route.route = [busNumber, stopName, duration, arrivalTimes];

      User.addRoute($scope.user.route);

      $scope.user.routeHeading = "Return Route";
      $scope.user.going = false;
      $scope.user.returning = true;
      $scope.user.getRouteBack();

    } else if (!$scope.user.going && $scope.user.returning){
      console.log('in return route');
      
      $scope.user.route.route = [busNumber, stopName, duration, arrivalTimes];
      User.addRoute($scope.user.route);

      $scope.user.returning = false;
      $scope.user.going = true;

      $location.path('/');

    }
    
  };

  var getNextBusTimes = function(xml, busNumber, direction, stopName){
    var times = [];
    var xmlDoc;

    if (window.DOMParser) {
      var parser = new DOMParser();
      xmlDoc = parser.parseFromString(xml,"text/xml");
    } else {
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = "false";
      xmlDoc.loadXML(xml); 
    }

    var traverseXML = function(element){
      

      if (element.tagName === "Route"){
        if (element.getAttribute("Code") === busNumber){

          var routeDirectionList = element.children[0];
          var routeDirection = routeDirectionList.children[0];
          
          if (routeDirection.getAttribute("Code") === direction){
            var stopList = routeDirection.children[0];
            var stop = stopList.children[0];

            if (stop.getAttribute("name") === stopName){

              var departureList = stop.children[0];
              
              for (var j = 0; j < departureList.children.length; j++){
                times.push(departureList.children[j].innerHTML);
              } // end of looping through departure times
            } // end of stopName check
          } // end of direction check
        } // end of busNumber check 
      } // end of if Route element check

      // traverse XML document
      if (element.children.length > 0){
        for (var i = 0; i < element.children.length; i++){
          traverseXML(element.children[i]);
        }
      }

    };

    // xmlDoc should start at xmlDoc.children[0].children[0] 
    // because of how the xml is structured
    traverseXML(xmlDoc.children[0].children[0]);

    // return the bus times 
    return times;
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
      

      directionsDisplay.setDirections(results);

      var options = {};
      options.numRoutes = results.routes.length;
      options.routes = [];

      // iterate through possible routes to take
      angular.forEach(results.routes, function(r,i,obj){
        // create an object to store all info related to this route
        // it will be added to the options object
        var route = {};

        // define the array to store tuples of bus line numbers and stop names for the given route
        route.lines = [];

        // add route duration to route object
        route.duration = r.legs['0'].duration.text;

        // define a steps variable for readibility for iterating over
        var steps = r.legs['0'].steps;

        // iterate over the steps in each route to find the bus line(s)
        // in the given route option and the direction (inbound or outbound)
        for (var key in steps){
          if (steps[key].travel_mode === "TRANSIT"){
            // the busNumber is called the short_name in Google's results object
           
            var busNumber = r.legs['0'].steps[key].transit.line.short_name;
            var stopName = r.legs['0'].steps[key].transit.departure_stop.name;

            var arrivalLocation = r.legs['0'].steps[key].transit.arrival_stop.location.F;
            var departureLocation = r.legs['0'].steps[key].transit.departure_stop.location.F;

            var direction;     

            if (arrivalLocation > departureLocation){
            direction = "Inbound";
            } else {
             direction = "Outbound";
            }

            if (busNumber){
              route.lines.push([busNumber, stopName, direction]);
            }
          }
        }
        // add route to options routes array
        options.routes.push(route);
        
      });

      $scope.user.routeOptions = options;
      
    });
  }; // end of getRouteOptions

  $scope.user.getRouteOptions(User.trip.from, User.trip.to);
      
  var updateBusTimes = function(){
    if ($scope.user.routeOptions === undefined) return;
      // edit route to have arrival information
    angular.forEach($scope.user.routeOptions.routes, function(r,i,obj) {
      console.log(r.lines[0][0], r.lines[0][1], r.lines[0][2]);
      $http.post('/route/times', {busNumber: r.lines[0][0], stopName: r.lines[0][1], direction: r.lines[0][2]})
        .success(function(data){
          var busTimes = getNextBusTimes(data.xml, data.busNumber, data.direction, data.stopName);
          console.log('bus: ', data.busNumber, 'arrival times: ', busTimes);
          // options.routes[i].arrivalTimes = busTimes;
          console.log(i);
          $scope.user.routeOptions.routes[i].arrivalTimes = busTimes;
        })
        .error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log('ERROR: ', data);
        })
        .finally(function(){
          console.log('finished',i);
        });
    });
  };

  $timeout(updateBusTimes,2000);
}); //end of routes controller