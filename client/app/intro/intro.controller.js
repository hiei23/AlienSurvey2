'use strict';

angular.module('surveyApp')
  .controller('IntroCtrl', function ($scope) {
    $scope.message = "You are doing a study.  It is on a volunteer basis.  You can stop and return to it at any time or explicitly press the Quit button to withdraw from the study.   If you choose to withdraw, you will be asked if you consent to using the answers you did provide for our study or you wish to discard them." +
      "The data we are collecting is to determine which representations are more effective for humans for identifying object similarity.  Your name will not be associated with the data you provide." +
      " Our ultimate goal is to develop a game that uses characters that humans find effective for identifying similarity to be able to match complex software systems.";
  });
