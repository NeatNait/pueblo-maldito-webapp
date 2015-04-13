'use strict';

angular.module('puebloMalditoWebappApp')
  .controller('AdminTrialCtrl', function ($scope, Trial) {

    $scope.trials = Trial.query();
    $scope.newTrial = new Trial();

    $scope.add = function(form) {
      if($scope.newTrial === '') {
        return;
      }

      $scope.submitted = true;

      if(form.$valid) {
        $scope.newTrial.$save(function(){
          $scope.trials.push(angular.copy($scope.newTrial));
          $scope.submitted = false;
          $scope.newTrial = new Trial();
        });
      }

    };

    $scope.delete = function(trial) {
      trial.$delete();
      $scope.trials = _.without($scope.trials, trial);
    };

  });
