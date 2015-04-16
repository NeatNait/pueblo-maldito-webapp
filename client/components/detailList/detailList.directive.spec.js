'use strict';

describe('Directive: trialList', function () {

  // load the directive's module and view
  beforeEach(module('puebloMalditoWebappApp'));
  beforeEach(module('components/trialList/trialList.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<trial-list></trial-list>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the trialList directive');
  }));
});