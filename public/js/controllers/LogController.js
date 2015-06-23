muniButlerApp
  .controller('LogController', function ($scope, Auth) {
    $scope.here = false;
    $scope.loggedin = false;
    $scope.options = [];

    $scope.logout = function(){ 
      Auth.logout()
        .then(function(resp) {
          return resp.data;
        }).catch(function(err){
          console.log(err);
          return;
        });
    };

    Auth.check()
      .then(function(resp) {
        $scope.loggedin = true;
        return resp.data;
      }).catch(function(err){
        $scope.options = err.data.authMethods;
        return;
      });
  });