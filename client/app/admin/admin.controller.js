(function(){
  'use strict';

  angular.module('puebloMalditoWebappApp')
    .controller('AdminCtrl', AdminCtrl);

    AdminCtrl.$inject = ['$http', '$window', 'Auth', 'User']

    function AdminCtrl($http, $window, Auth, User) {

      var vm = this;

      vm.addUser = addUser;
      vm.deleteUser = deleteUser;
      vm.editUser = editUser;
      vm.errors = {};
      vm.isAdmin = Auth.isAdmin;
      vm.user;
      vm.users;

      activate();

      function activate () {
        resetUser();
        vm.users = User.query(addUserHashChar);
      }

      function addUserHashChar(users){
        return _.map(users, function(u){
          //append # to hashCode for helping with search
          u.hashCode = '#'+u.code;
          return u;
        });
      }

      function addUser() {
        vm.submitted = true;

        if(vm.form.$valid) {
          vm.user.$save(processData, handleErrors);
          angular.element('form input:first').focus();
        }
      }

      function processData(data) {
        vm.users = User.query();
        resetUser();
        vm.form.$setPristine();
        vm.form.$setUntouched();
        vm.submitted = false;
      }

      function handleErrors(err) {
        err = err.data;
        vm.errors = {};

        // Update validity of vm.form fields that match the mongoose errors
        angular.forEach(err.errors, function(error, field) {
          vm.form[field].$setValidity('mongoose', false);
          vm.errors[field] = error.message;
        });
      }

      function editUser(user) {
        vm.user = user;
      }

      function deleteUser(user) {
        resetUser();
      }

      function resetUser(){
        vm.user = new User();
        vm.user.role = 'user';
      }

    }

})();