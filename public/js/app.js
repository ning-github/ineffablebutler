var muniButlerApp = angular.module('muniButler', ['ngMap', 
  'ngResource', 
  'ui.router', 
  'ngMaterial',
  'd3'])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.defaults.withCredentials = true;

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('/', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })
    .state('/routes', {
      url: '/routes',
      templateUrl: 'views/routes.html',
      controller: 'RoutesController'
    })
    .state('/login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: ''
    })
})
// for d3 visualization
.directive('changeColor', ['d3Service', function(d3Service) {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      d3Service.d3().then(function(d3) {
        var green = "#00ff00";
        var yellow = "#ffff00";
        var red = "#ff0000";

        var textFromNode = document.getElementsByClassName('duration');
        var minutes = +textFromNode[0].textContent.split(' ')[0];

        var colorScale = d3.scale.linear()
          .domain([0, 20, 40])
          .range([green, yellow, red]);

        d3.selectAll('.duration')
          .style('color', colorScale(minutes)); 
        
      });  
    }}
}]);
