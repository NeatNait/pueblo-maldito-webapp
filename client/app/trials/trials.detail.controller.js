(function() {
  'use strict';

  angular.module('puebloMalditoWebappApp')
    .controller('TrialsDetailCtrl', TrialsDetailCtrl);

  TrialsDetailCtrl.$inject = ['$stateParams', 'trials', 'User', 'userCodeManager'];

  function TrialsDetailCtrl($stateParams, trials, User, userCodeManager) {

    var vm = this;

    vm.checkin            = checkin;
    vm.cleanErrors        = cleanErrors;
    vm.completeTrial      = completeTrial;
    vm.errors             = {};
    vm.usersPassedPercent = usersPassedPercent;

    activate();

    function activate() {
      return trials.$promise.then(function(){
        vm.trial = _.find(trials, function(trial){
          return trial._id === $stateParams.trialId;
        });
      });
    }

    function proccessForm(form){
      vm.submitted = true;
      if(form.$valid) {
        vm.lastUserScanned = false;
        angular.element('form input:first').focus();
        return true;
      }
      return false;
    }

    function completeTrial(form) {
      if(proccessForm(form)) {
        User.completeTrial({
            id: vm.code
          }, {
            trialId: $stateParams.trialId
          },
          processCompleteOrCheckin,
          handleErrors
        );
      }
    }

    function checkin(form) {
      if(proccessForm(form)) {
        User.checkinTrial({
            id: vm.code
          }, {
            trialId: $stateParams.trialId
          },
          processCompleteOrCheckin,
          handleErrors
        );
      }
    }

    function processCompleteOrCheckin(data){

      vm.cleanErrors();
      vm.code = '';

      vm.lastUserScanned = data.user;

      //first time passed trial
      if(data.trial){
        vm.trial = data.trial;
      }
      else{
        vm.errors.userNotChanged = true;
      }

      vm.submitted = false;
    }

    function cleanErrors() {
      vm.errors = {};
    }

    function handleErrors(err) {
      vm.errors = err;
    }

    function usersPassedPercent() {
      if(vm.trial){
        return vm.trial.users.length*100/400;
      }
      else{
        return 0;
      }
    }



    /*for (var i = 0; i < 900; i++) {
      //console.log('input', i);
      var n = _.parseInt(i+''+ userCodeManager.calculateDigit(i));
      console.log(n);
      //console.log(i+''+ userCodeManager.checkDigit(n));
    }*/

    /*for (var i = 0; i < 700; i++) {
      console.log('input', i);
      console.log(i+''+ userCodeManager.checkDigit(i));
    };*/

  }
})();