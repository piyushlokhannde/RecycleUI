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
	var parmeterGoal =-1;
    var selParam =-1;

	var goal  = {"name":"Goal1" ,"parameters" :[{"name":"parameter"}]};

	var goalarray = new Array();
	goalarray.push(goal);

	$scope.goals = goalarray;

$scope.addGoal = function () {

	var des = new Object();
	des.name ="gola3";
	des.parameters = new Array();
	$scope.goals.push(des);
}

$scope.removeGoal = function () {
	
	if(seleectdGoal > 0) {
		goalarray.splice(seleectdGoal, 1);
		seleectdGoal =-1;

	} else if (seleectdGoal == 0 ) {
		goalarray.shift();
		seleectdGoal =-1;
	} 

	
}

$scope.setgroup = function(sgoal) {	

	seleectdGoal = sgoal;
} 

$scope.setparameter = function(groupIndex , paramIndex) {

	parmeterGoal = groupIndex;
	selParam = paramIndex	
}


$scope.addParam = function() {

	var param = new Object();
	param.name ="Param1";
	
	$scope.goals[seleectdGoal].parameters.push(param);


}

$scope.removeParam = function() {
	if(selParam > 0) {
		$scope.goals[seleectdGoal].parameters.splice(selParam, 1);
		

	} else if (selParam == 0 ) {
		$scope.goals[seleectdGoal].parameters.shift();
		
	} 

	parmeterGoal =-1;
    selParam =-1;
	
}

});