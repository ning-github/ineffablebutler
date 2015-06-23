muniButlerApp.factory('User', function(){
  var user = {};

  user.username = '';
  user.firstName = '';
  user.loginMethod = '';
  user.trip = {
    from: '178 5th Ave San Francisco, CA 94305',
    to: '944 Market St San Francisco, CA 94107'
  };
  // user.routes is an array of objects
  // each object contains two addresses and two options
  // {
  //   to: '944 Market St',
  //   from: '13333 Candy Lane',
  //   routeTo: ['38R', 'Geary Blvd & 6th Ave'],
  //   routeFrom: ['38R', 'Geary Blvd & O'Farrell Ave']
  // }

  user.routes = [];

  user.addRoute = function(obj){
    var route = {
      id: user.routes.length, 
      from: obj.from,
      to: obj.to,
      routeFrom: obj.routeFrom,
      routeTo: obj.routeTo
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


