'use strict';

angular.module('puebloMalditoWebappApp')
  .controller('TrialsDetailCtrl', function ($scope, $stateParams, trials, User) {

    trials.$promise.then(function(){
      $scope.trial = _.find(trials, function(trial){
        return trial._id === $stateParams.trialId;
      });
    });

    $scope.usersPassedPercent = function () {
      if($scope.trial){
        return $scope.trial.users.length*100/400;
      }
      else{
        return 0;
      }
    };

    $scope.cleanErrors = function () {
      $scope.errors = {};
    };

    $scope.cleanErrors();

    $scope.completeTrial = function(form) {
      $scope.submitted = true;
      if(form.$valid) {

        $scope.lastUserScanned = false;

        User.completeTrial({ id: $scope.code }, {trialId: $stateParams.trialId}, function(data){

          $scope.cleanErrors();

          $scope.code = '';
          $scope.lastUserScanned = data.user;

          //first time passed trial
          if(data.trial){
            $scope.trial = data.trial;
          }
          else{
            $scope.errors.userNotChanged = true;
          }

          $scope.submitted = false;

        }, function(err){
          // TODO : Show errors
          //if(404)

          /*if(err.status === 304){
            $scope.errors.userNotChanged = true;
          }*/
          $scope.errors = err;
        });
      }
    };

    $scope.checkin = function(form) {
      $scope.submitted = true;
      if(form.$valid) {

        $scope.lastUserScanned = false;

        User.checkinTrial({ id: $scope.code }, {trialId: $stateParams.trialId}, function(data){

          $scope.cleanErrors();

          $scope.code = '';
          $scope.lastUserScanned = data.user;

          //first time passed trial
          if(data.trial){
            $scope.trial = data.trial;
          }
          else{
            $scope.errors.userNotChanged = true;
          }

          $scope.submitted = false;

        }, function(err){
          // TODO : Show errors
          //if(404)

          /*if(err.status === 304){
            $scope.errors.userNotChanged = true;
          }*/
          $scope.errors = err;

        });
      }
    };

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

    for (var i = 0; i < 900; i++) {
      //console.log('input', i);
      var n = _.parseInt(i+''+calculateDigit(i));
      console.log(n);
      //console.log(i+''+checkDigit(n));
    };

    /*for (var i = 0; i < 700; i++) {
      console.log('input', i);
      console.log(i+''+checkDigit(i));
    };*/

  });
