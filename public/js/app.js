var muniButlerApp = angular.module('muniButler', ['ngMap', 'ngResource', 'ngRoute', 'ui.router', 'ngMaterial'])
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
    });
});

