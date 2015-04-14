'use strict';

angular.module('puebloMalditoWebappApp')
  .controller('AdminCtrl', function ($scope, $http, $window, Auth, User) {

    $scope.user = {};
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

    $scope.delete = function(user) {
      var deleteUser = $window.confirm('Are you absolutely sure you want to delete?');
      if (deleteUser) {
        User.remove({ id: user._id });
          angular.forEach($scope.users, function(u, i) {
          if (u === user) {
            $scope.users.splice(i, 1);
          }
        });
      }
    };

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {

        var user = $scope.user;
        /*Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })*/
        User.save(user,
          function(data) {
            $scope.users = User.query();
            $scope.user = {};
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

  });
