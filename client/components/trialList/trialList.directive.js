'use strict';

angular.module('puebloMalditoWebappApp')
  .directive('trialList', function () {
    return {
      templateUrl: 'components/trialList/trialList.html',
      restrict: 'E',
      scope: {
        showControls: '=showControls',
        trials: '=trials',
        editFn: '=edit',
        deleteFn: '=delete'
      },
      controller: function($scope, $element, $window, Trial){
        $scope.delete = function(trial) {
          var deleteTrial = $window.confirm('Are you absolutely sure you want to delete?');
          if (deleteTrial) {
            Trial.remove({ id: trial._id });
            angular.forEach($scope.trials, function(u, i) {
              if (u === trial) {
                $scope.trials.splice(i, 1);
              }
            });
            $scope.deleteFn();
          };
        }

        $scope.edit = $scope.editFn;

      },
      link: function (scope, element, attrs) {
      }
    };
  });