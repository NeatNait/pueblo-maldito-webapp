'use strict';

angular.module('puebloMalditoWebappApp')
  .controller('TrialsDetailCtrl', function ($scope, $stateParams, trials, User) {

    trials.$promise.then(function(){
      $scope.trial = _.find(trials, function(trial){
        return trial._id === $stateParams.trialId;
      });
    });

    $scope.add = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        User.addTrial({ id: $scope.code }, {trialId: $stateParams.trialId}, function(){
          $scope.code = '';
          $scope.submitted = false;
        }, function(){
          // TODO : Show errors
          //if(404)
        });
      }
    };

  });
