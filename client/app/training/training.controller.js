'use strict';

angular.module('surveyApp')
  .controller('TrainingCtrl', ['$scope', 'Restangular', '$state', '$cookies', '$modal', '$stateParams', function ($scope, Restangular, $state, $cookies, $modal, $stateParams) {
    $scope.invalidInput = false;
    $scope.questions = [];
    $scope.answers = [false, false, false, false, false];
    $scope.reveal = false;
    $scope.questionCounter = 1;
    $scope.description = {show: false, counter: 0, files:['app/training/descriptions/aliengreyed.html',
      'app/training/descriptions/alienfamily.html',
      'app/training/descriptions/bacteria.html',
      'app/training/descriptions/mochigroup.html']};

    $scope.questionInfo = {participantObjectId: '', question: {}, answer: ''};

    $scope.loadQuestions = function() {
      Restangular.all('api/training/' + $stateParams.mode).getList().then(function(serverJson) {
        $scope.questions = serverJson.plain();
        $scope.askNextQuestion();
      });
    };

    $scope.saveAnswer = function() {
      if ($scope.validate()) {

        $scope.displayAnswer();

        $scope.questionCounter += 1;
        $scope.progressBar += 1;
        $cookies.put('curTrainingQuestion', $scope.questionCounter.toString());

      } else {
        $scope.invalidInput = true;
      }

    };


    $scope.askNextQuestion = function() {
       if ($scope.questionCounter <= $scope.questions.length && $scope.reveal == false) {
         $scope.invalidInput = false;
         $scope.answers = [false, false, false, false, false];
        $scope.questionInfo = {participantObjectId: $cookies.get('participantObjectId'),
          question: $scope.questions[$scope.questionCounter - 1], answer: ''};
         $scope.vertical = $scope.questionInfo.question.type != 'aliens';
         $scope.bacteria = $scope.questionInfo.question.type == 'bacteria sets';
        $scope.description.show = false;
      } else if ($scope.questionCounter > $scope.questions.length) {
        $state.go('questions');
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
      $state.go('questions');
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

    $scope.validate = function () {
      var i;
      var counter = 0;
      for (i = 0; i < $scope.answers.length; i++) {
        if ($scope.answers[i] == true) {
          counter++;
        };
      };

      return counter == 2;
    };



    /////

    $scope.loadQuestions();

  }]);
