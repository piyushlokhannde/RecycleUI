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
            { key: "Team Chicago Bulls", y: 100 },
            { key: "Team LA Lakers", y: 2 },
            { key: "Team Houstan Rockets", y: 20 }
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
                    "key": "Team Chicago Bulls",
                     "values": [  [ 1 , 10] ,[ 2 , 10], [ 3, 10]]
                 },
                 {
                     "key": "Team LA Lakers",
                     "values": [ [ 1 , 11] , [ 2 , 8]  , [ 3 , 8]]
                 },
                 {
                     "key": "Team Houstan Rockets",
                     "values": [  [ 1 , 12],[ 2 , 12],[ 3 , 12] ]
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
                    "key": "Team Houstan Rockets",
                     "values": [  [ 1 , 1] ,[ 2 , 3], [ 3, 21]]
                 },
                 {
                     "key": "Team LA Lakers",
                     "values": [ [ 1 , 11] , [ 2 , 4]  , [ 3 ,5]]
                 },
                 {
                     "key": "Team Chicago Bulls",
                     "values": [  [ 1 , 1],[ 2 , 5],[ 3 , 6] ]
                }
             ];

              $scope.exampleData4 = [
                 {
                    "key": "Manjeet",
                     "values": [[ 0 , 200] ]
                 },
                 {
                     "key": "Rakesh ",
                     "values": [ [ 0 , 180] ]
                 },
                 {
                     "key": "Vinod ",
                     "values": [  [ 0 , 170] ]
                },
                 {
                     "key": "Taufiq",
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
                    "key": "Team Houstan Rockets",
                     "values": [  [ 1 , 1] ,[ 2 , 3], [ 3, 9], [ 4, 6], [ 5, 10]]
                 },
                 {
                     "key": "Team LA Lakers",
                     "values": [ [ 1 , 4] ,[ 2 , 5], [ 3, 3], [ 4, 5], [ 5, 12]]
                 },
                 {
                     "key": "Team Chicago Bulls",
                     "values": [   [ 1 , 2] ,[ 2 , 9], [ 3, 5], [ 4, 4], [ 5, 11]]
                }
             ];

              $scope.xAxissprintfeedbackFormat  = function() {

                return function (d) {              
                switch (d) {
                    case 1:
                        return "Question1";
                        break;
                    case 2:
                        return "Question2";
                        break;

                    case 3:
                        return "Question3";
                        break;
                     case 4:
                        return "Question4";
                        break;
                     case 5:
                        return "Question5";
                        break;
                     

                }
            }
            };


});



 