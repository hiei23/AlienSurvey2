'use strict';

angular.module('surveyApp')
  .controller('MainCtrl', ['$scope', 'Restangular', '$cookies', '$state', function ($scope, Restangular, $cookies, $state) {

    var part = $cookies.get('participantObjectId');

    if($cookies.get('participantObjectId')){
      $state.go('intro');
    } else {
      Restangular.all('api/participant/').get('').then(function(serverJson) {
        $cookies.put('participantObjectId', serverJson.objectId);
        $state.go('intro');
      });
    };
  }]);
