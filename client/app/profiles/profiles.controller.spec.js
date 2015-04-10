'use strict';

describe('Controller: ProfilesCtrl', function () {

  // load the controller's module
  beforeEach(module('puebloMalditoWebappApp'));

  var ProfilesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfilesCtrl = $controller('ProfilesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
