'use strict';

describe('Controller: TrialsCtrl', function () {

  // load the controller's module
  beforeEach(module('puebloMalditoWebappApp'));

  var TrialsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrialsCtrl = $controller('TrialsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
