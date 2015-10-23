'use strict';

angular.module('surveyApp')
  .controller('DescriptionCtrl', function ($scope, $stateParams, $state) {
    $scope.description = {show: false, counter: 0, files:['app/training/descriptions/aliengreyed.html',
      'app/training/descriptions/alienfamily.html',
      'app/training/descriptions/bacteria.html']};

    $scope.mode = parseInt($stateParams.mode);

    $scope.next = function () {
      $state.go('training', {mode: $stateParams.mode});
    };



  });
