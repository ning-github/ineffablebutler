muniButlerApp
  .controller('LogController', function ($scope, Auth) {
    $scope.here = false;
    // $scope.seekoption = function(){
    //   // temporary options, will ask server for actual list
    //   $scope.options.facebook = 'facebook';
    //   $scope.options.gmail = 'gmail';
    // };
    $scope.options = Auth.check();
    $scope.seekoption = function() {console.log($scope.options);};
  });