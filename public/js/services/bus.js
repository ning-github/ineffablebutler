muniButlerApp.factory('Bus', function ($http) {
    
  // Makes a POST request to the server to get XML data from 511 API which gets bus times
  var getBusArrivalTimes = function (busNumber, stopName, direction) {
    
    // Request route times for the bus from server
    return $http.post('/route/times', {
      busNumber: busNumber,
      stopName: stopName,
      direction: direction
    });

  };

  // Traverses XML data returned from server which holds bus arrival times  
  var traverseXML = function (xml, busNumber, direction, stopName) {

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

  return {
    getBusArrivalTimes: getBusArrivalTimes,
    traverseXML: traverseXML
  };

});