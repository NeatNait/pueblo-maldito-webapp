'use strict';

angular.module('puebloMalditoWebappApp')
  .directive('trialList', function () {
    return {
      templateUrl: 'components/trialList/trialList.html',
      restrict: 'E',
      scope: {
        allowDelete: '=allowDelete',
        trials: '=trials'
      },
      controller: function($scope, $element, Trial){
        $scope.delete = function(trial) {
          Trial.remove({ id: trial._id });
          angular.forEach($scope.trials, function(u, i) {
            if (u === trial) {
              $scope.trials.splice(i, 1);
            }
          });
        };
      },
      link: function (scope, element, attrs) {
      }
    };
  });