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
    vm.trialsColours;

    vm.yeah = function (points, event) {
      console.log(points, event)
    }

    vm.labels = ["January", "February", "March", "April", "May", "June", "July"];
    vm.series = ['Series A', 'Series B'];
    vm.data = [
      []
    ];
    vm.options = {
      animation: false,
      showScale: false,
      scaleOverride: true,
      // ** Required if scaleOverride is true **
      // Number - The number of steps in a hard coded scale
      scaleSteps: 15,
      // Number - The value jump in the hard coded scale
      scaleStepWidth: 1,
      // Number - The scale starting value
      scaleStartValue: 1,

      barShowStroke : false,
      barValueSpacing: 1,

      showTooltips: false,
      pointDot: false,
      //datasetStrokeWidth: 0.5
    };

    //TODO : deleteme
    vm.labelsDoughnut = ["Alive", "Unknow", "Dead"];
    vm.dataDoughnut = [800, 100, 200];


    activate();

    function activate () {

      vm.trialsColours = [
        //'#97BBCD', // blue
        //'#DCDCDC', // light grey
        '#4D5360',  // dark grey
        //'#F7464A', // red
        '#46BFBD', // green
        '#FDB45C', // yellow
        '#949FB1' // grey
      ];

      $interval(reloadData, 1000 * 3);
      reloadData();

      $interval(reloadDataTimeGraphs, 1000 * 120);
      reloadDataTimeGraphs();


     /* $interval(function(){
        vm.data[0].push(Math.random()*90);
        //vm.data[1].push(Math.random()*90);
        vm.labels.push('');

        if(vm.data[0].length > 20){
          vm.labels = vm.labels.slice(1);
          vm.data[0] = vm.data[0].slice(1);
        }

      }, 1000 * 3);*/

    }

    function reloadData() {
      graphManager.reloadData().then(function (data) {

        /* Trials */
        var trialsData = graphManager.trialsGraph('Trial');
        vm.trialsLabels = trialsData.labels;
        vm.trialsSeries = ['Checkins', 'Passed'];
        vm.trialsData = trialsData.data;

        vm.totalCheckins =  _.sum(trialsData.data[0]);
        vm.totalPassed =  _.sum(trialsData.data[1]);

        /* Deaths */
        var deathsData = graphManager.trialsGraph('Death');
        vm.deathsLabels = deathsData.labels;
        vm.deathsSeries = ['Death'];
        vm.deathsData = [deathsData.data[1]];

        vm.totalDeaths = _.sum(deathsData.data[1]);

        /* Awards */
        var awardsData = graphManager.trialsGraph('Award');
        vm.awardsLabels = awardsData.labels;
        vm.awardsSeries = ['Checkins', 'Passed'];
        vm.awardsData = awardsData.data;

        vm.totalAwards = _.sum(awardsData.data[1]);

        /* Users */
        vm.dataDoughnut = graphManager.usersGraph();

      });
    }


    function reloadDataTimeGraphs() {
      graphManager.reloadData().then(function (data) {

        vm.sanityAverage = graphManager.average('sanity').toFixed(2);

        /* Sanity */
        vm.data[0].push(vm.sanityAverage);
        //vm.data[1].push(Math.random()*90);
        vm.labels.push('');

        if(vm.data[0].length > 30){
          vm.labels = vm.labels.slice(1);
          vm.data[0] = vm.data[0].slice(1);
        }

      });
    }


  }

})();