'use strict';

angular.module('puebloMalditoWebappApp')
  .controller('TrialsCtrl', function ($scope, Trial) {
    $scope.message = 'Hello';

    $scope.trials = Trial.query();


  });
