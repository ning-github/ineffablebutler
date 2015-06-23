muniButlerApp.factory('Auth', function($http){
  var check = function(){
    return $http({
      method: 'GET',
      url: '/api/user',
      withCredentials: true,
    });
  };

  var logout = function(){
    return $http({
      method: 'GET',
      url: '/api/logout',
      withCredentials: true,
    });
  };

  return {
    check: check,
    logout: logout
  };
});