'use strict';

angular.module('surveyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('description', {
        url: '/description/:mode',
        templateUrl: 'app/description/description.html',
        controller: 'DescriptionCtrl'
      });
  });
