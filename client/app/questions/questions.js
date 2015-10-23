'use strict';

angular.module('surveyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questions', {
        url: '/questions',
        templateUrl: 'app/questions/questions.html',
        controller: 'QuestionsCtrl'
      });
  });
