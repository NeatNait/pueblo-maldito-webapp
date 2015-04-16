'use strict';

angular.module('puebloMalditoWebappApp')
  .controller('ProfilesCtrl', function ($scope, $stateParams, User) {
  	$scope.trials = [];

    $scope.publicProfile = User.getByCode({ controller: $stateParams.code }, function(){
    	angular.forEach($scope.publicProfile.trials, function(value, key) {
			 $scope.trials.push(value.trial);
			});
    });

    
    
  });
