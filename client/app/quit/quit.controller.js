'use strict';

angular.module('surveyApp')
  .controller('QuitCtrl', ['$scope', '$modalInstance', '$state', 'Restangular', '$cookies', function ($scope,
                                                                                          $modalInstance, $state, Restangular, $cookies) {

    $scope.ok = function (keepData) {
      $modalInstance.close('closed');

      if(keepData == 'n'){
        Restangular.all('api/participant/delete/' + $cookies.get('participantObjectId')).post().then(function(serverJson) {
        });
      }

      $state.go('end');
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  }]);
