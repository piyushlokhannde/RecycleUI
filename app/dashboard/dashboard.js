'use strict';

var dashboardapp = angular.module('myApp.dashboard', ['ngRoute', 'nvd3ChartDirectives']);

dashboardapp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'dashboardCtrl'
  });
}]);
dashboardapp.controller('dashboardCtrl', function($scope) {

   $scope.exampleData2 = [
            { key: "Team One", y: 100 },
            { key: "TeamTwo", y: 2 },
            { key: "TeamThree", y: 20 },
            { key: "TeamFour", y: 7 },
            ];
            
            
            $scope.xFunction = function(){
              return function(d) {
                return d.key;
              };
            }
            $scope.yFunction = function(){
	            return function(d){
		            return d.y;
	            };
            }


             $scope.exampleData1 = [
                 {
                    "key": "Series 1",
                     "values": [ [ 1 ,122] , [ 0 , 10] ]
                 },
                 {
                     "key": "Series 2",
                     "values": [ [ 1 , 12] , [ 0 , 11] , [ 0 , 8] ]
                 },
                 {
                     "key": "Series 3",
                     "values": [ [ 1 , 13] , [ 0 , 12] ]
                },
                 {
                     "key": "Series 4",
                     "values": [ [ 1 ,12] , [ 0 , 3] ]
                 }
             ];


});



 