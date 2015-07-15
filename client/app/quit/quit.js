'use strict';

angular.module('surveyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('quit', {
        url: '/quit',
        templateUrl: 'app/quit/quit.html',
        controller: 'QuitCtrl'
      });
  });