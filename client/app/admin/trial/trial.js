'use strict';

angular.module('puebloMalditoWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin-trials', {
        url: '/admin/trials',
        templateUrl: 'app/admin/trial/trial.html',
        controller: 'AdminTrialCtrl'
      });
  });