'use strict';

angular.module('puebloMalditoWebappApp')
  .factory('User', function (Resource) {
    return Resource('/api/users/:id/:controller/:action', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      completeTrial: {
        method: 'PUT',
        params: {
          controller:'trial',
          action:'complete'
        }
      },
      checkinTrial: {
        method: 'PUT',
        params: {
          controller:'trial',
          action:'checkin'
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
