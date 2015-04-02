'use strict';

angular.module('puebloMalditoWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('trials', {
        url: '/trials',
        templateUrl: 'app/trials/trials.html',
        controller: 'TrialsCtrl'
      });
  });