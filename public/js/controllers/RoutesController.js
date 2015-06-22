muniButlerApp.controller('RoutesController', function($scope, User, GoogleMaps){
  console.log('in RoutesController')
  $scope.user = {};
  $scope.user.username = User.username;
  $scope.user.firstName = User.firstName;
  $scope.user.newRouteAddresses = User.newRouteAddresses;

  GoogleMaps.getDirections();

});