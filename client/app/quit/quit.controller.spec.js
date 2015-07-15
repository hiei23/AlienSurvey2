'use strict';

describe('Controller: QuitCtrl', function () {

  // load the controller's module
  beforeEach(module('surveyApp'));

  var QuitCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuitCtrl = $controller('QuitCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
