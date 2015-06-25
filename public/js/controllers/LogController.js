muniButlerApp
  .controller('LogController', function ($scope, Auth, User) {
    console.log('in LogController')
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
          User.displayName = resp.data.displayName;
          User.id = resp.data.id;
          User.routes = resp.data.routes;
          return;
        }).catch(function(err){
          $scope.options = err.data.authMethods;
          return;
        });
    };

    $scope.login();
  });