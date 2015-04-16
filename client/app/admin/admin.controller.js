'use strict';

angular.module('puebloMalditoWebappApp')
  .controller('AdminCtrl', function ($scope, $http, $window, Auth, User) {

    $scope.user = {role:'user'};
    $scope.errors = {};
    $scope.isAdmin = Auth.isAdmin;

    // Use the User $resource to fetch all users
    $scope.users = User.query(function(users){
      return _.map(users, function(u){
        //append hashCode for helping with search
        u.hashCode = '#'+u.code;
        return u;
      });
    });

    $scope.add = function(form) {
      $scope.submitted = true;

      if(form.$valid) {

        var user = $scope.user;
        user.$save(
          function(data) {
            $scope.users = User.query();
            $scope.user = {role:'user'};
            form.$setPristine();
            form.$setUntouched();
            $scope.submitted = false;
          },
          function(err) {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
        });
      }
    };

    $scope.edit = function (user) {
      $scope.user = user;
    };

    $scope.delete = function(user) {
      $scope.user = {role:'user'};
    };

  });
