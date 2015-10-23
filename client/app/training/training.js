'use strict';

angular.module('surveyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('training', {
        url: '/training/:mode',
        templateUrl: 'app/training/training.html',
        controller: 'TrainingCtrl'
      });
  });
