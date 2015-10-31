'use strict';
angular.module('surveyApp')
  .controller('MainCtrl', ['$scope', 'Restangular', '$cookies', '$state', function ($scope, Restangular, $cookies, $state) {
    $state.go('intro');
  }]);
