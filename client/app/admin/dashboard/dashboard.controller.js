(function(){
  'use strict';

  angular.module('puebloMalditoWebappApp')
    .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['graphManager', '$interval'];

  function DashboardCtrl(graphManager, $interval) {
    var vm =  this;

    vm.sanityAverage;

    vm.trialsLabels;
    vm.trialsSeries;
    vm.trialsData;
    vm.trialsColours = [
      //'#97BBCD', // blue
      //'#DCDCDC', // light grey
      '#4D5360',  // dark grey

      //'#F7464A', // red
      '#46BFBD', // green
      '#FDB45C', // yellow
      '#949FB1' // grey
    ];


    $interval(getData, 3000);
    getData();


    /*function getData() {
      graphManager.reloadData().then(function (data) {
        //console.log(data);
        graphManager.average('sanity').then(function (data) {
          vm.sanityAverage = data;
        });

        graphManager.trialsGraph().then(function (data) {
          console.log(data);
          vm.trialsLabels = data.labels;
          vm.trialsSeries = ['Passed', 'Failed'];
          vm.trialsData = data.data;
        });
      });
    }*/

    function getData() {
      graphManager.reloadData().then(function () {
        //console.log(data);
        vm.sanityAverage = graphManager.average('sanity');

        var trialsData = graphManager.trialsGraph();
        vm.trialsLabels = trialsData.labels;
        vm.trialsSeries = ['Passed', 'Failed'];
        vm.trialsData = trialsData.data;
    });
    }

  }

})();