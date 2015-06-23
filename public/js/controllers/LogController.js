muniButlerApp
  .controller('LogController', function ($scope, Auth) {
    $scope.here = false;
    $scope.loggedin = false;
    $scope.options = [];

    $scope.logout = function(){ 
      Auth.logout()
        .then(function(resp) {
          console.log('logged out');
          $scope.loggedin = false;
          return $scope.login();
        }).catch(function(err){
          console.log(err);
          return;
        });
    };

    $scope.login = function() {
      Auth.check()
        .then(function(resp) {
          console.log('logged in');
          $scope.loggedin = true;
          return resp.data;
        }).catch(function(err){
          $scope.options = err.data.authMethods;
          return;
        });
    };

    $scope.login();
  });