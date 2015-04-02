'use strict';

describe('Controller: TrialCtrl', function () {

  // load the controller's module
  beforeEach(module('puebloMalditoWebappApp'));

  var TrialCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrialCtrl = $controller('TrialCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
