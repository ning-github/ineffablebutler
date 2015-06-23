muniButlerApp.controller('HomeController', function($scope, User, $location, Autocomplete) {

  // user object to store info related to this user
  $scope.user = {};

  $scope.submit = function(){

    User.addRoute($scope.user.to,$scope.user.from);
    $location.path('/routes');
    // call factory function with user's home and work addresses
    // to get directions from Google Maps API  
  };

  $scope.routes = User.routes;
  $scope.test = function(){
    console.log($scope.routes);
  };

  Autocomplete.initialize($scope);

});