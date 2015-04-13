'use strict';

angular.module('puebloMalditoWebappApp')
  .controller('MainCtrl', function ($scope, $http, socket, $interval) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };

    $scope.labelsDoughnut = ["Alive", "Unknow", "Dead"];
    $scope.dataDoughnut = [800, 100, 200];

    $scope.labelsBars = ['Trial 06', 'Trial 07', 'Trial 08', 'Trial 09', 'Trial 10', 'Trial 11', 'Trial 12','Trial 06', 'Trial 07', 'Trial 08', 'Trial 09', 'Trial 10', 'Trial 11', 'Trial 12','Trial 06', 'Trial 07', 'Trial 08', 'Trial 09', 'Trial 10', 'Trial 11', 'Trial 12'];
    $scope.seriesBars = ['Passed', 'Failed'];

    $scope.dataBars = [
      [65, 59, 80, 81, 56, 55, 22, 32, 14, 44, 43, 55, 33, 25, 55, 65, 59, 80, 81, 56, 55],
      [28, 48, 40, 19, 86, 27, 42, 22, 11, 23, 12, 22, 28, 40, 86, 27, 42, 22, 11, 23, 12]
    ];

    $scope.coloursBars = [
      //'#97BBCD', // blue
      //'#DCDCDC', // light grey
      '#F7464A', // red
      '#46BFBD', // green
      '#FDB45C', // yellow
      '#949FB1', // grey
      '#4D5360'  // dark grey
    ];

    $interval(function(){
      //$scope.dataDoughnut = [Math.random()*400, Math.random()*400, Math.random()*400];
      $scope.dataDoughnut[0]*=0.9;
      $scope.dataDoughnut[2]*=1.1;
      $scope.dataDoughnut[1]*=1.05;
      /*$scope.data = [
        [Math.random()*100, Math.random()*100, Math.random()*100],
        [Math.random()*100, Math.random()*100, Math.random()*100]
      ];*/
    }, 5000);
  });
