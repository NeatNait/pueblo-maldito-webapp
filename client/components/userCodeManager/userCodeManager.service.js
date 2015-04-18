(function(){
  'use strict';

  angular.module('puebloMalditoWebappApp')
    .factory('userCodeManager', userCodeManager);

  function userCodeManager() {

    var service = {
      calculateDigit : calculateDigit,
      checkDigit : checkDigit
    };

    return service;

    ////////////

    function calculateDigit(number){

      var numbers   = _.map((number+'').split(''), Number),//to string split and back to number
          oddsEvens = _.partition(numbers, evenPosition),
          oddsSum   = _.sum(oddsEvens[1]) || 0, //prevent NaN for 1 digit numbers
          evensSum  = _.sum(oddsEvens[0]),
          result    = (evensSum*3 + oddsSum) % 10;

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

  }

})();