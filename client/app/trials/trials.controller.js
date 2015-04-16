(function(){
  'use strict';

  angular.module('puebloMalditoWebappApp')
    .controller('TrialsCtrl', TrialsCtrl);

  TrialsCtrl.$inject = ['trials'];

  function TrialsCtrl(trials) {
    var vm = this;
    vm.trials = trials;
  }
})();