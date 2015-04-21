(function(){
  'use strict';

  angular.module('puebloMalditoWebappApp')
    .controller('AdminCtrl', AdminCtrl);

    AdminCtrl.$inject = ['$http', '$window', 'Auth', 'User', 'userCodeManager', 'dniManager'];

    function AdminCtrl($http, $window, Auth, User, userCodeManager, dniManager) {

      var vm = this;

      vm.addUser = addUser;
      vm.deleteUser = deleteUser;
      vm.editUser = editUser;
      vm.errors = {};
      vm.isAdmin = Auth.isAdmin;
      vm.user;
      vm.users;

      vm.datePicker             = {};
      vm.datePicker.today       = today;
      vm.datePicker.clear       = clearDatePicker;
      vm.datePicker.open        = openDatePicker;
      vm.datePicker.dateOptions = {formatYear: 'yy', startingDay: 1};
      vm.datePicker.format      = 'dd/MM/yyyy';

      activate();

      function activate () {
        resetUser();
        vm.datePicker.today();
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

        if(validateForm()) {
          vm.user.$save(processData, handleErrors);
          angular.element('form input:first').focus();
        }
      }

      function validateForm() {
        vm.form.dni.$setValidity('valid', dniManager.validate(vm.user.dni));
        vm.form.code.$setValidity('valid', userCodeManager  .checkDigit(vm.user.code));
        return vm.form.$valid;
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
          if(vm.form[field]){
            vm.form[field].$setValidity('mongoose', false);
          }
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

      function today() {
        vm.datePicker.dt = new Date();
      }

      function clearDatePicker() {
        vm.datePicker.dt = null;
      }

      function openDatePicker($event) {
        $event.preventDefault();
        $event.stopPropagation();

        vm.datePicker.opened = true;
      }

    }

})();