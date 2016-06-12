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
                    "key": "TeamFour",
                     "values": [  [ 1 , 10] ,[ 2 , 10], [ 3, 10]]
                 },
                 {
                     "key": "TeamTwo ",
                     "values": [ [ 1 , 11] , [ 2 , 8]  , [ 3 , 8]]
                 },
                 {
                     "key": "TeamThree ",
                     "values": [  [ 1 , 12],[ 2 , 12],[ 3 , 12] ]
                },
                 {
                     "key": "TeamOne",
                     "values": [  [ 1 , 12],[ 2 , 12],[ 3 , 12]]
                 }
             ];

            $scope.xAxisTickFormatFormat  = function() {

                return function (d) {              
                switch (d) {
                    case 1:
                        return "Delivery";
                        break;
                    case 2:
                        return "Qaulity";
                        break;

                    case 3:
                        return "Innovation";
                        break;

                }
            }
            };

             $scope.exampleDataperf = [
                 {
                    "key": "TeamFour",
                     "values": [  [ 1 , 1] ,[ 2 , 3], [ 3, 21]]
                 },
                 {
                     "key": "TeamTwo ",
                     "values": [ [ 1 , 11] , [ 2 , 4]  , [ 3 ,5]]
                 },
                 {
                     "key": "TeamThree ",
                     "values": [  [ 1 , 1],[ 2 , 5],[ 3 , 6] ]
                },
                 {
                     "key": "TeamOne",
                     "values": [  [ 1 , 1],[ 2 , 6],[ 3 , 7]]
                 }
             ];

              $scope.exampleData4 = [
                 {
                    "key": "TeamMem1",
                     "values": [[ 0 , 200] ]
                 },
                 {
                     "key": "TeamMem2 ",
                     "values": [ [ 0 , 180] ]
                 },
                 {
                     "key": "TeamMem3 ",
                     "values": [  [ 0 , 170] ]
                },
                 {
                     "key": "TeamMem4",
                     "values": [  [ 0 , 165]]
                 }
                 ,
                 {
                     "key": "TeamMem5",
                     "values": [  [ 0 , 160]]
                 }
                 ,
                 {
                     "key": "TeamMem6",
                     "values": [  [ 0 , 150]]
                 }
                 ,
                 {
                     "key": "TeamMem7",
                     "values": [  [ 0 , 135]]
                 }
                 ,
                 {
                     "key": "TeamMem8",
                     "values": [  [ 0 , 125]]
                 }
                 ,
                 {
                     "key": "TeamMem9",
                     "values": [  [ 0 , 120]]
                 }
                 ,
                 {
                     "key": "TeamMem10",
                     "values": [  [ 0 , 110]]
                 }
             ];

              $scope.sprintFeedbackdata = [
                 {
                    "key": "TeamFour",
                     "values": [  [ 1 , 1] ,[ 2 , 3], [ 3, 9], [ 4, 6], [ 5, 10]]
                 },
                 {
                     "key": "TeamTwo ",
                     "values": [ [ 1 , 4] ,[ 2 , 5], [ 3, 3], [ 4, 5], [ 5, 12]]
                 },
                 {
                     "key": "TeamThree ",
                     "values": [   [ 1 , 2] ,[ 2 , 9], [ 3, 5], [ 4, 4], [ 5, 11]]
                },
                 {
                     "key": "TeamOne",
                     "values": [   [ 1 , 6] ,[ 2 , 9], [ 3, 7], [ 4, 1], [ 5, 14]]
                 }
             ];

              $scope.xAxissprintfeedbackFormat  = function() {

                return function (d) {              
                switch (d) {
                    case 1:
                        return "Criteria1";
                        break;
                    case 2:
                        return "Criteria2";
                        break;

                    case 3:
                        return "Criteria3";
                        break;
                     case 4:
                        return "Criteria4";
                        break;
                     case 5:
                        return "Criteria5";
                        break;
                     

                }
            }
            };


});



 