muniButlerApp.factory('Auth', function($http){
  var check = function(){
    return $http({
      method: 'GET',
      url: '/api/user',
    }).then(function(resp) {
      return resp.data;
    }).catch(function(err){
      console.error("Nope");
    });  
  };

  return {
    check: check
  };
});