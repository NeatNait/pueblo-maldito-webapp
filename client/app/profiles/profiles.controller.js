'use strict';

angular.module('puebloMalditoWebappApp')
  .controller('ProfilesCtrl', function ($scope, $stateParams, User) {

  	$scope.trials = [];
    $scope.awards = [];
    $scope.deaths = [];

    $scope.publicProfile = User.getByCode({ controller: $stateParams.code }, function(){

      //console.log($scope.publicProfile);

    	angular.forEach($scope.publicProfile.trials, function(value, key) {

        switch(value.trial.type){
          case 'Trial':
            $scope.trials.push(value.trial);
            break;
          case 'Award':
            $scope.awards.push(value.trial);
            break;
          case 'Death':
            $scope.deaths.push(value.trial);
            break;
        }

        //$scope.trials.push(value.trial);


		  });
    });

  });
