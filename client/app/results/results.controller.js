'use strict';

angular.module('surveyApp')
  .controller('ResultsCtrl', function ($scope, Restangular) {
    Restangular.all('api/participant/results/').getList().then(function(serverJson) {
      $scope.results = serverJson.map(function (val) {
        var answers = val.answers.toString()
        return {email: val.email, result: answers};
      });
    });
  });
