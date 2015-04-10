'use strict';

angular.module('puebloMalditoWebappApp')
  .controller('ProfilesCtrl', function ($scope, $stateParams, User, Trial) {
  	$scope.trials = [];
    $scope.publicProfile = User.getByCode({ controller: $stateParams.code }, function(){
    	angular.forEach($scope.publicProfile.trials, function(value, key) {
    		Trial.get({ id: value.trial }, function(a) {
					$scope.trials.push(a);
				});
			});
    });

    
  });
