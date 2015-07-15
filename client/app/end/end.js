'use strict';

angular.module('surveyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('end', {
        url: '/end',
        templateUrl: 'app/end/end.html',
        controller: 'EndCtrl'
      });
  });