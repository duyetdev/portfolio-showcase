'use strict';

angular.module('portfolioShowcaseApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.me = [];
    $scope.repos = [];

    $http.get('https://api.github.com/users/duyetdev').success(function(me) {
      $scope.me = me;
      socket.syncUpdates('thing', $scope.me);
    });

    $http.get('https://api.github.com/users/duyetdev/repos').success(function(repos) {
      $scope.repos = repos;
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
