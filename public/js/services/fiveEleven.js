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