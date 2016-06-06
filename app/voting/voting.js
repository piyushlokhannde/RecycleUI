'use strict';

angular.module('myApp.voting', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/voting', {
    templateUrl: 'voting/voting.html',
    controller: 'votingCtrl'
  });
}])

.controller('votingCtrl', function($scope) {
    $scope.myFunction = function() {
        alert('dd');
    }
});