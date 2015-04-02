'use strict';

angular.module('puebloMalditoWebappApp')
  .factory('Trial', function ($resource) {
    return $resource('/api/trials/:id', {
      id: '@_id'
    });
  });
