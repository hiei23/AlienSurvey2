'use strict';

angular.module('surveyApp', [
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'restangular'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
