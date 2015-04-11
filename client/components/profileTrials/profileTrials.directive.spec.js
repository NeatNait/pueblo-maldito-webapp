'use strict';

describe('Directive: profileTrials', function () {

  // load the directive's module and view
  beforeEach(module('puebloMalditoWebappApp'));
  beforeEach(module('components/profileTrials/profileTrials.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<profile-trials></profile-trials>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the profileTrials directive');
  }));
});