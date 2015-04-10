'use strict';

angular.module('puebloMalditoWebappApp')
  .controller('ProfilesCtrl', function ($scope, $stateParams, User) {
    $scope.publicProfile = User.getByCode({ controller: $stateParams.code });
  });
