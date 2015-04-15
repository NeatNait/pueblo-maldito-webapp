'use strict';

angular.module('puebloMalditoWebappApp')
  .controller('AdminTrialCtrl', function ($scope, Trial) {

    $scope.trials = Trial.query();
    $scope.trial = new Trial();

    $scope.add = function(form) {
      if($scope.trial === '') {
        return;
      }

      $scope.submitted = true;

      if(form.$valid) {
        $scope.trial.$save(function(){

          var t = _.find($scope.trials, function(trial){
            return trial._id === $scope.trial._id;
          });

          if(!t){
            $scope.trials.push(angular.copy($scope.trial));
          }

          $scope.submitted = false;
          $scope.trial = new Trial();
        });
      }

    };

    $scope.delete = function(trial) {
      $scope.trial = new Trial();
      //$scope.trials = _.without($scope.trials, trial);
    };

    $scope.edit = function (trial) {
      $scope.trial = trial;
    };

  });
