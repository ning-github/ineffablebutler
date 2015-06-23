muniButlerApp
  .controller('LogController', function ($scope, Auth) {
    $scope.here = false;
    $scope.options = {};
    $scope.seekoption = function(){
      // temporary options, will ask server for actual list
      $scope.options.facebook = 'facebook';
      $scope.options.gmail = 'gmail';
    };
    Auth.check();
  });