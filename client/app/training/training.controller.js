'use strict';

angular.module('surveyApp')
  .controller('TrainingCtrl', ['$scope', 'Restangular', '$state', '$cookies', '$modal', function ($scope, Restangular, $state, $cookies, $modal) {
    $scope.questions = [];
    $scope.reveal = false;
    $scope.max = 20;
    $scope.questionCounter = 0;
    $scope.questionInfo = {participantObjectId: '', question: {}, answer: ''};

    $scope.loadQuestions = function() {
      Restangular.all('api/training/').getList().then(function(serverJson) {
        $scope.questions = serverJson.plain();
        $scope.askNextQuestion();
      });
    };

    $scope.saveAnswer = function(answer) {
      $scope.questionInfo.answer = answer;
      Restangular.all('api/participant/').post({questionInfo: $scope.questionInfo}).then(function(serverJson) {
        $scope.displayAnswer();
      });
    };


    $scope.askNextQuestion = function() {
      $scope.questionCounter +=1;
      if ($scope.questionCounter <= $scope.questions.length) {
        $scope.questionInfo = {participantObjectId: $cookies.get('participantObjectId'),
          question: $scope.questions[$scope.questionCounter - 1], answer: ''};
      } else {
        $scope.end();
      };

    };

    $scope.displayAnswer = function() {
      $scope.reveal = true;
    };

    $scope.next = function() {
      $scope.reveal = false;
      $scope.askNextQuestion();
    };

    $scope.end = function() {
      $state.go('end');
    };

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '/app/quit/quit.html',
        controller: 'QuitCtrl',
        size: size
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
      });
    };



    /////

    $scope.loadQuestions();

  }]);
