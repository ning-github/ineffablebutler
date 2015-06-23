muniButlerApp.factory('GoogleMaps', function(User){

  var googleMaps = {};

  // googleMaps.routeGoing = {
  //   routeFrom: User.newRouteAddresses['from'],
  //   routeTo: User.newRouteAddresses['to'],
  //   options: []
  // };

  // googleMaps.routeReturning = {
  //   routeFrom: googleMaps.routeGoing['routeTo'],
  //   routeTo: googleMaps.routeGoing['routeFrom'],
  //   options: []
  // };

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

  // googleMaps.getDirections = function(directionsServiceObject, directionsRequestObject){
  //   var results;

  //   directionsServiceObject.route(directionsRequestObject, function(results, status){

  //     if (!status === "OK"){
  //       throw status;
  //     }

  //     var options = {};
  //     options.numRoutes = results.routes.length;
  //     options.routes = [];

  //     // iterate through possible routes to take
  //     for (var i = 0; i < results.routes.length; i++){

  //       // create an object to store all info related to this route
  //       // it will be added to the options object
  //       var route = {};

  //       // define the array to store tuples of bus line numbers and stop names for the given route
  //       route.lines = [];

  //       // add route duration to route object
  //       route.duration = results.routes[i].legs['0'].duration.text;

  //       // define a steps variable for readibility for iterating over
  //       var steps = results.routes[i].legs['0'].steps;

  //       // iterate over the steps in each route to find the bus line(s)
  //       // in the given route option
  //       for (var key in steps){
  //         if (steps[key].travel_mode === "TRANSIT"){
  //           // the busNumber is called the short_name in Google's results object
  //           var busNumber = results.routes[i].legs['0'].steps[key].transit.line.short_name;
  //           var stopName = results.routes[i].legs['0'].steps[key].transit.departure_stop.name;
  //           route.lines.push([busNumber, stopName]);
  //         }
  //       }

  //       // add route to options routes array
  //       options.routes.push(route);
  //     }
  //     console.log('options: ', options);
  //     User.routeOptions = options;
  //     return options;

  //   });
  //   console.log('results: ', results);
  //   return results;
  // };

  // googleMaps.getDirections = function(from, to){
  //   // create new Directions Service object
  //   var directions = new google.maps.DirectionsService();

  //   // create the directions request object to be used in 
  //   // Directions Service request
  //   var directionsRequest = {
  //     origin: from,
  //     destination: to,
  //     travelMode: google.maps.TravelMode.TRANSIT,
  //     transitOptions: {
  //       modes: [google.maps.TransitMode.BUS]
  //     },
  //     unitSystem: google.maps.UnitSystem.IMPERIAL,
  //     durationInTraffic: true,
  //     provideRouteAlternatives: true,
  //     avoidHighways: false,
  //     avoidTolls: false,
  //   };

  //   // get directions from Google's Directions Service
  //   directions.route(directionsRequest, function(results, status){
      
  //     if (!status === "OK"){
  //       throw status;
  //     }

  //     var options = {};
  //     options.numRoutes = results.routes.length;
  //     options.routes = [];

  //     // iterate through possible routes to take
  //     for (var i = 0; i < results.routes.length; i++){

  //       // create an object to store all info related to this route
  //       // it will be added to the options object
  //       var route = {};

  //       // define the array to store tuples of bus line numbers and stop names for the given route
  //       route.lines = [];

  //       // add route duration to route object
  //       route.duration = results.routes[i].legs['0'].duration.text;

  //       // define a steps variable for readibility for iterating over
  //       var steps = results.routes[i].legs['0'].steps;

  //       // iterate over the steps in each route to find the bus line(s)
  //       // in the given route option
  //       for (var key in steps){
  //         if (steps[key].travel_mode === "TRANSIT"){
  //           // the busNumber is called the short_name in Google's results object
  //           var busNumber = results.routes[i].legs['0'].steps[key].transit.line.short_name;
  //           var stopName = results.routes[i].legs['0'].steps[key].transit.departure_stop.name;
  //           route.lines.push([busNumber, stopName]);
  //         }
  //       }

  //       // add route to options routes array
  //       options.routes.push(route);
  //     }
  //     console.log(options);
  //     return options;
  //   }); // end .route()

  // }; // end getDirections()

  return googleMaps;
});