'use strict';

angular.module('surveyApp')
  .controller('EndCtrl', ['$scope', '$cookies', function ($scope, $cookies) {
    $cookies.remove('participantObjectId');
  }]);
