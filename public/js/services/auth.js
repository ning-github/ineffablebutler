muniButlerApp.factory('Auth', function($http){
  var check = function(){
    return $http({
      method: 'GET',
      url: '/api/user',
      withCredentials: true,
    }).then(function(resp) {
      return resp.data;
    }).catch(function(err){
      console.error("Nope", err.data.authMethods);
      return 
    });  
  };

  return {
    check: check
  };
});