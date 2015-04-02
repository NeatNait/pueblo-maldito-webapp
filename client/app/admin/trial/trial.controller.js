'use strict';

angular.module('puebloMalditoWebappApp')
  .controller('TrialCtrl', function ($scope, Trial) {

    $scope.trials = Trial.query();
    $scope.newTrial = new Trial();

    $scope.add = function(form) {
      if($scope.newTrial === '') {
        return;
      }

      $scope.submitted = true;

      if(form.$valid) {

        //var trial = new Trial();
        //trial.name = $scope.newTrial;
        $scope.newTrial.$save(function(){
          $scope.trials.push(angular.copy($scope.newTrial));
          //$scope.newTrial = '';
          $scope.submitted = false;
          $scope.newTrial = new Trial();
        });
      }

    };

    $scope.delete = function(trial) {
      trial.$delete();
      $scope.trials = _.without($scope.trials, trial);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('trial');
    });
  });
