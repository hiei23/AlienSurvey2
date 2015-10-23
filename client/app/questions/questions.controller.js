'use strict';

angular.module('surveyApp')
  .controller('QuestionsCtrl', ['$scope', 'Restangular', '$state', '$cookies', '$modal', function ($scope, Restangular, $state, $cookies,
                                                                                                                   $modal) {
    $scope.questions = [];
    $scope.reveal = true;
    $scope.answers = [false, false, false, false, false];
    $scope.invalidInput = false;


    $scope.description = {counter: $cookies.get('curDescription'), files:['app/training/descriptions/aliengreyed.html',
      'app/training/descriptions/alienfamily.html',
      'app/training/descriptions/bacteria.html']};

    $scope.max = 27;
    $scope.questionCounter = parseInt($cookies.get('curQuestion'));
    $scope.progressBar = parseInt($cookies.get('curQuestion')) - 1;
    $scope.questionInfo = {participantObjectId: '', question: {}, answer: ''};

    $scope.loadQuestions = function() {
      Restangular.all('api/question/').getList().then(function(serverJson) {
        $scope.questions = serverJson.plain();
        $scope.askNextQuestion();
      });
    };

    $scope.saveAnswer = function(answer) {
      if ($scope.validate()) {
        $scope.invalidInput = false;
        $scope.reveal = false;
        $scope.questionCounter += 1;
        $scope.progressBar += 1;
        $cookies.put('curQuestion', $scope.questionCounter.toString());

        $scope.questionInfo.answer = $scope.answers;
        Restangular.all('api/participant/').post({questionInfo: $scope.questionInfo}).then(function(serverJson) {
          $scope.next();
        });
      } else {
        $scope.invalidInput = true;
      }


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


    $scope.askNextQuestion = function() {
      var b = $cookies.get('showDescription');
      if ($scope.questions[$scope.questionCounter -1] &&
        $scope.questions[$scope.questionCounter - 1].mode && $cookies.get('showDescription') == 'false') {
        $scope.description.counter = parseInt($scope.questions[$scope.questionCounter - 1].mode);
        $cookies.put('curDescription', $scope.description.counter);
        $cookies.put('showDescription', true);
        $scope.tutorial();
      } else if ($scope.questionCounter <= $scope.questions.length) {
        $scope.answers = [false, false, false, false, false];
        $scope.questionInfo = {participantObjectId: $cookies.get('participantObjectId'),
          question: $scope.questions[$scope.questionCounter - 1], answer: ''};
        $scope.vertical = $scope.questionInfo.question.type != 'aliens';
        $scope.bacteria = $scope.questionInfo.question.type == 'bacteria sets';
        $cookies.put('showDescription', false);
      } else if ($scope.questionCounter > $scope.questions.length) {
        $scope.end();
      };
    };

    $scope.descriptionOk = function () {
      $scope.askNextQuestion();
    };

    //$scope.displayAnswer = function() {
    //  $scope.reveal = true;
    //};

    $scope.next = function() {
      $scope.askNextQuestion();
      $scope.reveal = true;
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

    $scope.tutorial = function () {
      Restangular.all('api/participant/tutorial').post({participantObjectId: $cookies.get('participantObjectId'), mode: $scope.questions[$scope.questionCounter - 1].type}).then(function(serverJson) {
        $cookies.put('showDescription', true);
        $state.go('description', {mode: $scope.description.counter.toString()});
      });
    };



    /////

    $scope.loadQuestions();

  }]);
