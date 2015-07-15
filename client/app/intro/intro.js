'use strict';

angular.module('surveyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('intro', {
        url: '/intro',
        templateUrl: 'app/intro/intro.html',
        controller: 'IntroCtrl'
      });
  });