muniButlerApp.factory('FiveEleven', function($http, User){
  var fiveEleven = {};

  fiveEleven.APItoken = 'e04385aa-cdb9-4f5b-9d78-9c7e0dcb7260';

  fiveEleven.APIEndpoints = {
    routes: 'http://services.my511.org/Transit2.0/GetRoutesForAgency.aspx?token=' + fiveEleven.APItoken + '&agencyName=SF-MUNI',

    stopCodes: 'http://services.my511.org/Transit2.0/GetStopsForRoute.aspx?token='+ fiveEleven.APItoken +'&routeIDF=SFMUNI~'+ fiveEleven.routeCode /* + '~' + fiveEleven.direction*/ ,

    nextDepartures: 'http://services.my511.org/Transit2.0/GetNextDeparturesByStopCode.aspx?token=' + fiveEleven.APItoken + '&stopCode='
  };


  return fiveEleven;
});