(function () {
  'use strict';

  angular.module('puebloMalditoWebappApp')
    .factory('graphManager', graphManager);

  graphManager.$inject = ['User', 'Trial', '$q'];

  function graphManager(User, Trial, $q) {

    var usersData,
        trialsData;

    // Public API here
    var service = {
      reloadData : reloadData,
      average : average,
      trialsGraph : trialsGraph,
      usersGraph : usersGraph
    };

    return service;

    /////////////

    function reloadData () {
      var defered = $q.defer();

      $q.all([User.query().$promise, Trial.query().$promise]).then(function (data) {

        usersData = data[0];
        trialsData = data[1];

        defered.resolve(data);
      });

      return defered.promise;

    }

    function average(statName) {

      var usersAlive = _.filter(usersData, alive),
          stats = _.pluck(usersAlive, 'stats'),
          selectedStats = _.pluck(stats, statName),
          sumSelectedStats = _.sum(selectedStats);

      return sumSelectedStats/usersAlive.length;

      function alive (user) {
        return user.stats.lives > 0;
      }
    }

    function trialsGraph () {

      var passed = [],
          checkins = [],
          labels = [];

      var trialsOrdered = _.sortBy(trialsData, 'name');

      _.each(trialsOrdered, getPartition);

      return {
        data : [checkins, passed],
        labels : labels
      };

      function getPartition(trial) {
        var partition = _.partition(trial.users, filterByStatus);
        passed.push(partition[0].length);
        checkins.push(partition[1].length);
        labels.push(trial.name);
      }

      function filterByStatus (user) {
        return user.status === 'passed';
      }
    }

    function usersGraph () {

      var usersAlive = _.filter(users, alive),
          stats = _.pluck(usersAlive, 'stats'),
          selectedStats = _.pluck(stats, statName),
          sumSelectedStats = _.sum(selectedStats);

      return sumSelectedStats/usersAlive.length;

      function alive (user) {
        return user.stats.lives > 0;
      }
    }

  }
})();