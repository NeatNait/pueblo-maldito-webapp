'use strict';

angular.module('puebloMalditoWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profiles', {
        url: '/p/:code',
        templateUrl: 'app/profiles/profiles.html',
        controller: 'ProfilesCtrl'
      });
  });