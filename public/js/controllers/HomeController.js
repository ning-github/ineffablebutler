muniButlerApp.controller('HomeController', function($scope) {
  console.log('in HomeController');

  // user object to store info related to this user
  // E.g., homeAddress, workAddress
  $scope.user = {};

  $scope.submit = function(){
  
    // call factory function with user's home and work addresses
    // to get directions from Google Maps API  

  };

});