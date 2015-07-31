'use strict';

angular.module('surveyApp')
  .controller('TrainingCtrl', ['$scope', 'Restangular', '$state', '$cookies', '$modal', function ($scope, Restangular, $state, $cookies, $modal) {
    $scope.questions = [];
    $scope.reveal = false;
    $scope.description = {show: false, counter: 0, files:['app/training/descriptions/aliengreyed.html',
      'app/training/descriptions/alienfamily.html',
      'app/training/descriptions/bacteria.html',
      'app/training/descriptions/mochigroup.html']};
    $scope.max = 16;
    $scope.questionCounter = parseInt($cookies.get('curTrainingQuestion'));
    $scope.progressBar = parseInt($cookies.get('curTrainingQuestion')) - 1;
    $scope.questionInfo = {participantObjectId: '', question: {}, answer: ''};

    $scope.loadQuestions = function() {
      Restangular.all('api/training/').getList().then(function(serverJson) {
        $scope.questions = serverJson.plain();
        $scope.askNextQuestion();
      });
    };

    $scope.saveAnswer = function(answer) {
      $scope.answer = answer;
      $scope.displayAnswer();

      $scope.questionCounter += 1;
      $scope.progressBar += 1;
      $cookies.put('curTrainingQuestion', $scope.questionCounter.toString());

      $scope.questionInfo.answer = answer;
      Restangular.all('api/participant/').post({questionInfo: $scope.questionInfo}).then(function(serverJson) {
      });
    };


    $scope.askNextQuestion = function() {
      if ($scope.questions[$scope.questionCounter -1] &&
        $scope.questions[$scope.questionCounter - 1].mode && $scope.description.show == false) {
        $scope.description.counter = parseInt($scope.questions[$scope.questionCounter - 1].mode);
        $scope.description.show = true;
      } else if ($scope.questionCounter <= $scope.questions.length && $scope.reveal == false) {
        $scope.questionInfo = {participantObjectId: $cookies.get('participantObjectId'),
          question: $scope.questions[$scope.questionCounter - 1], answer: ''};
        $scope.description.show = false;
      } else if ($scope.questionCounter > $scope.questions.length) {
        $scope.end();
      };
    };

    $scope.descriptionOk = function () {
      $scope.askNextQuestion();
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
        templateUrl: 'app/quit/quit.html',
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
