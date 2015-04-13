'use strict';

angular.module('puebloMalditoWebappApp')
  .controller('ProfilesCtrl', function ($scope, $stateParams, User, Trial) {
  	$scope.trials = [];
    var totalTrials = Trial.query();
    $scope.publicProfile = User.getByCode({ controller: $stateParams.code }, function(){
    	angular.forEach($scope.publicProfile.trials, function(value, key) {
    		Trial.get({ id: value.trial }, function(a) {
					$scope.trials.push(a);
				});
			});
    });

    
    $scope.TrialsPassedPercent = function () {
      if($scope.trials){
        //return $scope.trial.users.length*100/400;
        return Math.round(($scope.trials.length / totalTrials.length) * 100);
      }
      else{
        return 0;
      }
    };
  });
