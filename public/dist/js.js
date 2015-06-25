var muniButlerApp = angular.module('muniButler', ['ngMap', 'ngResource', 'ngRoute', 'ngMaterial'])
.config(function($routeProvider, $httpProvider) {
  $httpProvider.defaults.withCredentials = true;


  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })
    .when('/routes', {
      templateUrl: 'views/routes.html',
      controller: 'RoutesController'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: ''
    })
    .otherwise({redirectTo: '/'});
    // Your code here
})


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
muniButlerApp
  .controller('LogController', function ($scope, Auth) {
    console.log('in LogController')
    $scope.here = false;
    $scope.loggedin = false;
    $scope.options = [];

    $scope.logout = function(){ 
      Auth.logout()
        .then(function(resp) {
          console.log('logged out');
          $scope.loggedin = false;
          return $scope.login();
        }).catch(function(err){
          console.log(err);
          return;
        });
    };

    $scope.login = function() {
      Auth.check()
        .then(function(resp) {
          console.log('logged in');
          $scope.loggedin = true;
          return resp.data;
        }).catch(function(err){
          $scope.options = err.data.authMethods;
          return;
        });
    };

    $scope.login();
  });
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
  
  $scope.user.getRouteBack = function(){
    $scope.user.getRouteOptions(User.trip['to'], User.trip['from']);
  };

  $scope.user.getNextBusTimes = function(busNumber, stopName){
    // query database to get StopCode for busNumber and stopName


    // declare variable to hold response data from server
    var xml; 

    // make a request to 511 endpoint to get next times
    $http.get(FiveEleven.APIEndpoints.nextDepartures(stopName))
      .success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        xml = data;
        console.log("DATA!!!!!!!")
        console.log(data);
        console.log(xml);
        return xml;
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(status, data)
      });

    var nextDepartures = FiveEleven.getNextBustTimes(xml, busNumber);
    console.log(nextDepartures);

  };

  $scope.user.getNextBusTimes('38', "14258");

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
      // $scope.user.routeOptions =  $scope.user.handleResults(results);

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
muniButlerApp.factory('Auth', function($http){
  var check = function(){
    return $http({
      method: 'GET',
      url: '/api/user',
      withCredentials: true,
    });
  };

  var logout = function(){
    return $http({
      method: 'GET',
      url: '/api/logout',
      withCredentials: true,
    });
  };

  return {
    check: check,
    logout: logout
  };
});
muniButlerApp.factory('Autocomplete', function(){

  var initialize = function(scope) {
    var from = new google.maps.places.Autocomplete((document.getElementsByClassName('autocomplete')[0]));
    var to = new google.maps.places.Autocomplete((document.getElementsByClassName('autocomplete')[1]));
    google.maps.event.addListener(from, 'place_changed', function() {
      scope.user.from = from.getPlace().formatted_address;
    });
    google.maps.event.addListener(to, 'place_changed', function() {
      scope.user.to = to.getPlace().formatted_address;
   });
  };
  return {
    initialize: initialize
  };
});

muniButlerApp.factory('UserDb', function ($resource) {
  return $resource('/api/user/:id', null, {
    'update': {
      method: 'PUT'
    }
  });
});

muniButlerApp.factory('FiveEleven', function($http, User){
  var fiveEleven = {};

  fiveEleven.APItoken = 'e04385aa-cdb9-4f5b-9d78-9c7e0dcb7260';

  fiveEleven.APIEndpoints = {

    nextDepartures: function(stopCode){
      return 'http://services.my511.org/Transit2.0/GetNextDeparturesByStopCode.aspx?token=' + fiveEleven.APItoken + '&stopCode=' + stopCode;
    }
  };

  fiveEleven.getNextBustTimes = function(xml, busNumber){

    var times = [];

    var traverseXML = function(element){
      console.log(element);

      // base case
      // find the next bus departures for the busNumber at the given stop
      // e.g., 38, 38R, 38BX share the same stop
      // we just want the next times for 38
      if (element.getAttribute("Code") === busNumber){
        var stoplist = element.childNodes[0];
        var stop = stoplist.childNodes[0];
        var departureTimeList = stop.childNodes[0];

        for (var j = 0; j < departureTimeList.childNodes.length; j++){
          // add the text node of the departure time to the times array
          times.push(departureTimeList.childNodes[i].childNodes[0]);
        }

        return;
      }

      // does this element have children?
      if (element.childNodes){
        // iterate over them to see if they are they target element
        for (var i = 0; i < element.childNodes.length; i++){
          traverseXML(element.childNodes[i]);
        }
      }


    };

    traverseXML(xml);
    return times;

  };


  return fiveEleven;
});
muniButlerApp.factory('GoogleMaps', function(User){

  var googleMaps = {};

  googleMaps.getDirectionsRequestObject = function(from, to){
    
    var obj = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.TRANSIT,
      transitOptions: {
        modes: [google.maps.TransitMode.BUS]
      },
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      durationInTraffic: true,
      provideRouteAlternatives: true,
      avoidHighways: false,
      avoidTolls: false
    };

    return obj;
  };

  googleMaps.createDirectionsService = function(){
    var obj = new google.maps.DirectionsService();
    return obj;
  };

  googleMaps.createDirectionsRendererObject = function(){
    var obj = new google.maps.DirectionsRenderer();
    return obj;
  };

  return googleMaps;
});
muniButlerApp.factory('User', function(Auth){
  var user = {};

  // if(userlogggin ?) {
  //   //  populate user object 
  //   user.routes = Routes.get({ id:user.id })
  // } else {
  //   user.username = '';
  //   user.firstName = '';
  //   user.loginMethod = '';
  //   user.trip = {
  //     from: '178 5th Ave San Francisco, CA 94305',
  //     to: '944 Market St San Francisco, CA 94107'
  //   };

  //   // user.routes is an array of objects
  //   // each object contains two addresses and two options
  //   // {
  //   //   to: '944 Market St',
  //   //   from: '13333 Candy Lane',
  //   //   route: ['38R', 'Geary Blvd & 6th Ave'],
  //   // }
  //   user.routes = [];
  // }

  // console.log(Auth.username)

  // to save user's routes to database
  // Routes.update({id: id:user.id}, user.routes);

  user.username = '';
  user.firstName = '';
  user.loginMethod = '';
  user.routes = [];
  // user.trip is the current route the user is creating
  user.trip = {
    from: '178 5th Ave San Francisco, CA 94305',
    to: '944 Market St San Francisco, CA 94107'
  };

  // user.routes is an array of objects
  // each object contains two addresses and two options
  // {
  //   to: '944 Market St',
  //   from: '13333 Candy Lane',
  //   route: ['38R', 'Geary Blvd & 6th Ave'],
  // }

  // adds routes to the user.routes array
  // home page displays routes in the user.routes array
  user.addRoute = function(obj){
    var route = {
      id: user.routes.length, 
      from: obj.from,
      to: obj.to,
      route: obj.route
    };

    user.routes.push(route);
    console.log(route);
    return route;
  };

  user.removeRoute = function(id){
    var removed = user.routes.splice(id, 1);
    return removed;
  };

  return user;
});


