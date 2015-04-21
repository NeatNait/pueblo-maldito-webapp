'use strict';

describe('Service: dniManager', function () {

  // load the service's module
  beforeEach(module('puebloMalditoWebappApp'));

  // instantiate service
  var dniManager;
  beforeEach(inject(function (_dniManager_) {
    dniManager = _dniManager_;
  }));

  it('should do something', function () {
    expect(!!dniManager).toBe(true);
  });

});
