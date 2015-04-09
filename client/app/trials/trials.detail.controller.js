'use strict';

angular.module('puebloMalditoWebappApp')
  .controller('TrialsDetailCtrl', function ($scope, $stateParams, trials, User) {

    trials.$promise.then(function(){
      $scope.trial = _.find(trials, function(trial){
        return trial._id === $stateParams.trialId;
      });
    });

    $scope.usersPassedPercent = function () {
      if($scope.trial){
        return $scope.trial.users.length*100/400;
      }
      else{
        return 0;
      }
    };

    $scope.cleanErrors = function () {
      $scope.errors = {};
    };

    $scope.cleanErrors();

    $scope.add = function(form) {
      $scope.submitted = true;
      if(form.$valid) {

        $scope.lastUserScanned = false;

        User.addTrial({ id: $scope.code }, {trialId: $stateParams.trialId}, function(data){

          $scope.cleanErrors();

          $scope.code = '';
          $scope.lastUserScanned = data.user;

          //first time passed trial
          if(data.trial){
            $scope.trial = data.trial;
          }
          else{
            $scope.errors.userNotChanged = true;
          }

          $scope.submitted = false;

        }, function(err){
          // TODO : Show errors
          //if(404)

          /*if(err.status === 304){
            $scope.errors.userNotChanged = true;
          }*/
          console.log(err);
        });
      }
    };

  });
