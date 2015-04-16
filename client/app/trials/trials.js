'use strict';

angular.module('puebloMalditoWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('trials', {
        url: '/trials',
        abstract: 'true',
        templateUrl: 'app/trials/trials.html',
        controller: 'TrialsCtrl',
        authenticate: true,
        resolve: {
          trials: function(Trial){
            return Trial.query();
          }
        }
      })
      .state('trials.list', {
        url: '',
        templateUrl: 'app/trials/trials.list.html',
        authenticate: true
      })
      .state('trials.detail', {
        url: '/:trialId',
        templateUrl: 'app/trials/trials.detail.html',
        controller: 'TrialsDetailCtrl as vm',
        authenticate: true
      })

      ;
  });