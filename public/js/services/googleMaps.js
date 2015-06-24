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