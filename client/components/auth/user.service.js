'use strict';

angular.module('puebloMalditoWebappApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      addTrial: {
        method: 'PUT',
        params: {
          controller:'trial'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      getByCode: {
        method: 'GET',
        params: {
          id:'code',
        }
      }
	  });
  });
