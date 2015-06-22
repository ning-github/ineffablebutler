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
    var directions = new google.maps.DirectionsService();
    var renderer = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById("map"));

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

    directions.route(directionsRequest, function(result, status){
      
      if (!status === "OK"){
        throw status;
      }

      console.log(result);

    });

    renderer.setMap(map);

  };

  return googleMaps;
});