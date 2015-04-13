'use strict';

angular.module('puebloMalditoWebappApp')
  .controller('TrialsCtrl', function ($scope, trials) {
    $scope.trials = trials;
  });
