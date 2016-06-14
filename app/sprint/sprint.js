'use strict';

angular.module('myApp.sprint', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sprint', {
    templateUrl: 'sprint/sprint.html',
    controller: 'sprintCtrl'
  });
}])

.controller('sprintCtrl',function($scope ) {

	var seleectdGoal=-1;

	var goal  = {"name":"Goal1"};

	var goalarray = new Array();
	goalarray.push(goal);

	$scope.goals = goalarray;

$scope.addGoal = function () {

	var des = new Object();
	des.name ="gola3";
	alert($scope.goals.push(des));
}

$scope.removeGoal = function () {
	alert(seleectdGoal);
	if(seleectdGoal > 0) {
		goalarray.splice(seleectdGoal, 1);
		seleectdGoal =-1;

	} else if (seleectdGoal == 0 && goalarray.length ==1) {
		goalarray.length = 0;
		seleectdGoal =-1;
	}

	
}

$scope.setgroup = function(sgoal) {	
	seleectdGoal = sgoal;
} 

});