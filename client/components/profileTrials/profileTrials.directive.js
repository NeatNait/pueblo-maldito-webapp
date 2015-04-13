'use strict';

angular.module('puebloMalditoWebappApp')
  .directive('profileTrials', function () {
    return {
      templateUrl: 'components/profileTrials/profileTrials.html',
      restrict: 'E',
      scope: {
        trials: '=trials'
      },
      link: function (scope, element, attrs) {
      }
    };
  });