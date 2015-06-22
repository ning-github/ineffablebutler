muniButlerApp.factory('GoogleMaps', function(User){

  var googleMaps = {};

  googleMaps.routeGoing = {
    routeFrom: User.newRouteAddresses['from'],
    routeTo: User.newRouteAddresses['to'],
    options: []
  };

  googleMaps.routeReturning = {
    routeFrom: googleMaps.routeGoing['routeTo'],
    routeTo: googleMaps.routeGoing['routeFrom'],
    options: []
  };

  googleMaps.getDirections = function(){
    var directions = new  google.maps.DirectionsService();

    var directionsRequest = {
      origin: googleMaps.routeGoing['routeFrom'],
      destination: googleMaps.routeGoing['routeTo'],
      travelMode: google.maps.TravelMode.TRANSIT,
      transitOptions: {
        modes: [google.maps.TransitMode.BUS]
      },
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      durationInTraffic: true,
      provideRouteAlternatives: true,
      avoidHighways: false,
      avoidTolls: false,
    };

    directions.route(directionsRequest, function(response){
      console.log(response);
    });

  };

  return googleMaps;
});