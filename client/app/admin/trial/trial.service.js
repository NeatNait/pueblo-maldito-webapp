'use strict';

angular.module('puebloMalditoWebappApp')
  .factory('Trial', function (Resource) {
    return Resource('/api/trials/:id', {
      id: '@_id'
    });
  });
