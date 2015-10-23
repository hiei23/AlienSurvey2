'use strict';

angular.module('surveyApp')
  .controller('IntroCtrl', function ($scope, $state, Restangular, $cookies) {
    $scope.email = null;

    $scope.next = function () {
      if ($scope.email) {
        Restangular.all('api/participant/add-email/').post({email: $scope.email, participantObjectId: $cookies.get('participantObjectId')}).then(function(serverJson) {
          $state.go('questions');
        });
      } else {
        $state.go('questions');
      }
    };

  });
