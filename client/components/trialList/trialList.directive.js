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
      link: function (scope, element, attrs) {
      }
    };
  });