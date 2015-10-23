'use strict';

angular.module('surveyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('results', {
        url: '/results',
        templateUrl: 'app/results/results.html',
        controller: 'ResultsCtrl'
      });
  });
