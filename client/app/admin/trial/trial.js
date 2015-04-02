'use strict';

angular.module('puebloMalditoWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('trials', {
        url: '/admin/trials',
        templateUrl: 'app/admin/trial/trial.html',
        controller: 'TrialCtrl'
      });
  });