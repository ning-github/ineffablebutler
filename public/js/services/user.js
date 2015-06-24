muniButlerApp.factory('User', function(Auth){
  var user = {};

  // if(userlogggin ?) {
  //   //  populate user object 
  //   user.routes = Routes.get({ id:user.id })
  // } else {
  //   user.username = '';
  //   user.firstName = '';
  //   user.loginMethod = '';
  //   user.trip = {
  //     from: '178 5th Ave San Francisco, CA 94305',
  //     to: '944 Market St San Francisco, CA 94107'
  //   };

  //   // user.routes is an array of objects
  //   // each object contains two addresses and two options
  //   // {
  //   //   to: '944 Market St',
  //   //   from: '13333 Candy Lane',
  //   //   route: ['38R', 'Geary Blvd & 6th Ave'],
  //   // }
  //   user.routes = [];
  // }

  // console.log(Auth.username)

  // to save user's routes to database
  // Routes.update({id: id:user.id}, user.routes);

  user.username = '';
  user.firstName = '';
  user.loginMethod = '';
  user.routes = [];
  // user.trip is the current route the user is creating
  user.trip = {
    from: '178 5th Ave San Francisco, CA 94305',
    to: '944 Market St San Francisco, CA 94107'
  };

  // user.routes is an array of objects
  // each object contains two addresses and two options
  // {
  //   to: '944 Market St',
  //   from: '13333 Candy Lane',
  //   route: ['38R', 'Geary Blvd & 6th Ave'],
  // }

  // adds routes to the user.routes array
  // home page displays routes in the user.routes array
  user.addRoute = function(obj){
    var route = {
      id: user.routes.length, 
      from: obj.from,
      to: obj.to,
      route: obj.route
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


