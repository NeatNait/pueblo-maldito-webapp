'use strict';

describe('Service: userCodeManager', function () {

  // load the service's module
  beforeEach(module('puebloMalditoWebappApp'));

  // instantiate service
  var userCodeManager;
  beforeEach(inject(function (_userCodeManager_) {
    userCodeManager = _userCodeManager_;
  }));

  it('should do something', function () {
    expect(!!userCodeManager).toBe(true);
  });

});
