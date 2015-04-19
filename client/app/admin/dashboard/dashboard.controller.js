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
    vm.trialsColours = trialsColours;

    activate();

    function activate () {
      $interval(reloadData, 1000 * 3);
      reloadData();
    }

    var trialsColours = [
      //'#97BBCD', // blue
      //'#DCDCDC', // light grey
      '#4D5360',  // dark grey
      //'#F7464A', // red
      '#46BFBD', // green
      '#FDB45C', // yellow
      '#949FB1' // grey
    ];

    function reloadData() {
      graphManager.reloadData().then(function (data) {

        vm.sanityAverage = graphManager.average('sanity');

        var trialsData = graphManager.trialsGraph();
        vm.trialsLabels = trialsData.labels;
        vm.trialsSeries = ['Passed', 'Failed'];
        vm.trialsData = trialsData.data;
      });
    }

  }

})();