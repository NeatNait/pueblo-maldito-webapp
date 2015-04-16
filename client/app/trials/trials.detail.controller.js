'use strict';

angular.module('puebloMalditoWebappApp')
  .controller('TrialsDetailCtrl', TrialsDetailCtrl);

TrialsDetailCtrl.$inject = ['$stateParams', 'trials', 'User'];

function TrialsDetailCtrl($stateParams, trials, User) {

  var vm = this;

  vm.usersPassedPercent = usersPassedPercent;
  vm.cleanErrors        = cleanErrors;
  vm.completeTrial      = completeTrial;
  vm.checkin            = checkin;
  vm.errors             = {};

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

  function calculateDigit(number){

    var numbers     = _.map((number+'').split(''), Number),//to string split and back to number
        oddsEvens   = _.partition(numbers, evenPosition),
        oddsSum     = _.sum(oddsEvens[1]) || 0, //prevent NaN for 1 digit numbers
        evensSum    = _.sum(oddsEvens[0]),
        result      = (evensSum*3 + oddsSum) % 10;

    return result ? 10-result : result;

    function evenPosition(num, i){
      return i % 2 == 0;
    }
  }

  function checkDigit(number){
    var numberString   = number+'',
        length         = numberString.length,
        originalNumber = _.parseInt(numberString.substr(0, length-1)),
        controlDigit   = _.parseInt(numberString.substr(length-1, length));

    return calculateDigit(originalNumber) === controlDigit;
  }

  /*for (var i = 0; i < 900; i++) {
    //console.log('input', i);
    var n = _.parseInt(i+''+calculateDigit(i));
    console.log(n);
    //console.log(i+''+checkDigit(n));
  }*/

  /*for (var i = 0; i < 700; i++) {
    console.log('input', i);
    console.log(i+''+checkDigit(i));
  };*/

}