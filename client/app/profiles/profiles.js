'use strict';

angular.module('puebloMalditoWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profiles', {
        url: '/profiles/:code',
        templateUrl: 'app/profiles/profiles.html',
        controller: 'ProfilesCtrl'
      });
  });