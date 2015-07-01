muniButlerApp.factory('User', function (Auth) {
  var user = {};

  // user.routes = [];



  user.routes = {};
  var index = 0;
  // user.trip is the current route the user is creating
  user.trip = {
    from: '',
    to: ''
  };

  // user.routes is an array of objects
  // each object contains two addresses and two options
  // {
  //   to: '944 Market St',
  //   from: '13333 Candy Lane',
  //   route: ['38R', 'Geary Blvd & 6th Ave', 'Inbound'],
  //   nextBus: ['3', '7', '12'] // minutes
  // }

  // adds routes to the user.routes array
  // home page displays routes in the user.routes array
  
  user.addRoute = function (obj, googleRouteObj) {
    var route = {
      id: index,
      from: obj.from,
      to: obj.to,
      route: obj.route,
      googleRouteObj: googleRouteObj
    };

    user.routes[index]= route;
    index++;

    if (user.id) {
      console.log('adding selected route to current user routes');
      Auth.update(user);
    }
    return route;
  };

  user.removeRoute = function (routeId) {
    // var removed = user.routes.splice(routeId, 1);
    var removed = user.routes[routeId];
    delete user.routes[routeId];
    console.log('route removed!!');
    console.log('user.routes: ', user.routes);
    if (user.id) {
      Auth.update(user);
    }
    return removed;
  };

  return user;
});
