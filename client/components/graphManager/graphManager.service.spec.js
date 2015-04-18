'use strict';

describe('Service: graphManager', function () {

  // load the service's module
  beforeEach(module('puebloMalditoWebappApp'));

  // instantiate service
  var graphManager;
  beforeEach(inject(function (_graphManager_) {
    graphManager = _graphManager_;
  }));

  it('should do something', function () {
    expect(!!graphManager).toBe(true);
  });

});
