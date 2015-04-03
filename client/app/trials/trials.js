'use strict';

angular.module('puebloMalditoWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('trials', {
        url: '/trials',
        abstract: 'true',
        templateUrl: 'app/trials/trials.html',
        controller: 'TrialsCtrl',
        resolve: {
          trials: function(Trial){
            return Trial.query();
          }
        }
      })
      .state('trials.list', {
        url: '',
        templateUrl: 'app/trials/trials.list.html'
      })
      .state('trials.detail', {
        url: '/:trialId',
        templateUrl: 'app/trials/trials.detail.html',
        controller: 'TrialsDetailCtrl'
      })

      ;
  });