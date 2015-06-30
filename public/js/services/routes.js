muniButlerApp.factory('Routes', function ($http) {
  var findTime = function () {
    return $http.get('/api/bus/:number/:direction/:stopname', {
      withCredentials: true
    });
  };

  return {
    findTime: findTime
  };
});

// How to use ? 
// From controller call this: 

// var bus = {
//   number: 3, 
//   direction: "Inbound", 
//   stopname: "4th and King"
// }
// Route.findTime(bus);