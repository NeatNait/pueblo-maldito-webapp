'use strict';

angular.module('puebloMalditoWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        abstract: 'true',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        authenticate: true
      })
      .state('admin.user', {
        url: '',
        templateUrl: 'app/admin/admin.user.html',
        authenticate: true
      })
  });