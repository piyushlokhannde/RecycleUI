'use strict';

var sprintapp = angular.module('myApp.sprint', ['ngRoute', 'ui.bootstrap', 'ngResource']);



sprintapp.factory('MasterGoalService', function ($resource) {
    return $resource('http://10.253.191.49:8080/getMasterGoals');
});

sprintapp.factory('MasterParamService', function ($resource) {
    return $resource('http://10.253.191.49:8080/getSprintParameters');
});

sprintapp.factory('MasterTeamService', function ($resource) {
    return $resource('http://10.253.191.49:8080/getTeams');
});

sprintapp.factory('MasterTeamMemberService', function ($resource) {
    return $resource('http://10.253.191.49:8080/getTeamMembers');
});




function caluclateTotal(arrayObject) {
	var total = 0;
	angular.forEach(arrayObject, function(value, key){
		var valueToAdd =0;
		if(isNaN(value.weightage) == false) {
				valueToAdd = value.weightage;
		} 
		total = total + Number(valueToAdd);
	});

	return total;
}

 function updateParameterWeightage(sprintParameters) {		
 	var weightPerParam = (100 / sprintParameters.length );
 	angular.forEach(sprintParameters, function(value, key){ 		
 		value.weightage = weightPerParam;		
 	});
 }


sprintapp.controller('DialogParamCtrl', function($scope, $uibModalInstance, paramarray, $log, MasterParamService) {


	$scope.paramList = paramarray;	
	$scope.paramTotal = caluclateTotal(paramarray);

	$scope.calTotalPer = function () {		
		$scope.paramTotal = caluclateTotal($scope.paramList);
	}


  	$scope.actions = MasterParamService.query();
  
	$scope.change = function(index){
		
		var param = $scope.actions[index];		
  		$scope.paramList.push(param); 
  		if(index > 0) {  			
  			$scope.actions.splice(index, 1);  			
		} else if (index == 0 ) {
			$scope.actions.shift();		
		}     
  	}


	$scope.submitUser = function () {
		$uibModalInstance.close($scope.paramList);		
  	};
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});




sprintapp.controller('DialogInstCtrl', function($scope, $uibModalInstance, goalarray, $log, MasterGoalService) {

	$scope.goalList = goalarray;
	$scope.goalTotal = caluclateTotal(goalarray);

	 



	$scope.calTotalPer = function () {	
		$scope.goalTotal = caluclateTotal($scope.goalList);
	}


	$scope.actions = MasterGoalService.query();
  	
  
	$scope.change = function(index){		
		var goal= $scope.actions[index];		
  		$scope.goalList.push(goal); 
  		$scope.goalTotal = caluclateTotal($scope.goalList);
  		updateParameterWeightage(goal.sprintParameters);
  		if(index > 0) {  			
  			$scope.actions.splice(index, 1);  			
		} else if (index == 0 ) {
			$scope.actions.shift();		
		}     
  	}




		  $scope.submitUser = function () {
		
			$uibModalInstance.close($scope.goalList);
		//	$scope.usr = {name: '', job: '', age: '', sal: '', addr:''};
  		};
		$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
		  };
});




sprintapp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sprint', {
    templateUrl: 'sprint/sprint.html',
    controller: 'sprintCtrl'
  });
}])

sprintapp.controller('sprintCtrl',function($scope, $uibModal, MasterTeamService, MasterTeamMemberService) {

	var seleectdGoal=-1;
	var parmeterGoal =-1;
    var selParam =-1;

   $scope.teams = MasterTeamService.query();
  	$scope.teamMemDropDown = MasterTeamMemberService.query();
   //alert(teams);
	
	$scope.goals = new Array();


	$scope.removeGoal = function () {	
			if(seleectdGoal > 0) {
			$scope.goals.splice(seleectdGoal, 1);
			seleectdGoal =-1;
		} else if (seleectdGoal == 0 ) {
			$scope.goals.shift();
			seleectdGoal =-1;
		}
	}

	$scope.setgoal = function(sgoal) {	
		seleectdGoal = sgoal;
	} 

	$scope.setparameter = function(groupIndex , paramIndex) {		
		parmeterGoal = groupIndex;
		selParam = paramIndex		
	}


	$scope.removeParam = function() {
		if(selParam > 0) {
			$scope.goals[seleectdGoal].sprintParameters.splice(selParam, 1);
		} else if (selParam == 0 ) {
			$scope.goals[seleectdGoal].sprintParameters.shift();		
		}
		parmeterGoal =-1;
    	selParam =-1;
	
	}



  
    $scope.addGoal = function(){
        
    	var dialogInst = $uibModal.open({
    		templateUrl: 'sprint/goalselectpopup.html',
    		controller: 'DialogInstCtrl',
    		size: '',
    		resolve: {
    			goalarray: function () {
    				return $scope.goals;
    			}
    		}
		});

		dialogInst.result.then(function (retungoallist) {
			$scope.goals = retungoallist;
		}, function () {
			 // $log.info('Modal dismissed at: ' + new Date());
			});
     };


     $scope.addParam = function(goal){
        
        var dialogInst = $uibModal.open({
    		templateUrl: 'sprint/paramselectpopup.html',
    		controller: 'DialogParamCtrl',
    		size: '',
    		resolve: {
    			paramarray: function () {
    				  return goal.sprintParameters;
    			}
    		}
		});
		dialogInst.result.then(function (retunParamlist) {
			    	goal.parameters = retunParamlist;
		}, function () {
			 // $log.info('Modal dismissed at: ' + new Date());
			});
    };


    $scope.showParameters = function (fixedValue, paramValue) {    	
			return (fixedValue.indexOf(paramValue.parameterType) > -1);		 
	};


	// Team Sectionn code  Start.

	$scope.calculatePercentage = function(teamList){
		                                
                                var projectAvg = $scope.projectLevelAvg;
                                //var teamList = $scope.teamMemDropDown;
                                var sum=0;
                                if(teamList.length ==0){
                                	return;
                                }

                                for (var i=0;i<teamList.length;i++){
                                				var temp = 0;
                                				if(!isNaN(teamList[i].teamMemberTotal)) {
													temp = teamList[i].teamMemberTotal;
                                				}
                                                sum = parseInt(sum,10) + parseInt(temp);
                                }

                                var teamAvg = sum/teamList.length;

                                var comparedAvg = Math.round((teamAvg/projectAvg)*100)
                                
                                $scope.percent = comparedAvg;
                             

                                if(comparedAvg<60){
                                                $scope.progressBarType =  "danger";
                                } else if(comparedAvg>=60 && comparedAvg < 80) {
                                                $scope.progressBarType = "warning";
                                } else if (comparedAvg>=80 && comparedAvg < 90) {
                                                $scope.progressBarType = "info";
                                } else if (comparedAvg >=90 ) {
                                                $scope.progressBarType = "success";
                                }
                               
                };


	$scope.addTeam = function() {
		alert("Add Team");
	}


	$scope.selectTeam = function(index) {
		$scope.selectedTeam =  $scope.teams[index];
		$scope.teamMembers = $scope.teams[index].teamMemberTOs;
		$scope.calculatePercentage($scope.teamMembers);	

	}

	$scope.removeTeamMember = function(teamMember,index) {		
		if(index > 0) {
			$scope.teamMembers.splice(index, 1);			
		} else if (index == 0 ) {
			$scope.teamMembers.shift();			
		}
		$scope.calculatePercentage($scope.teamMembers);	

	}

	$scope.selectTeamMember = function(index) {
		$scope.teamMembers.push($scope.teamMemDropDown[index]);
	}



	// Team section code end.

});




sprintapp.service("goalListModel", function() {

	var seleectdGoal=-1;
	var parmeterGoal =-1;
    var selParam =-1;

	this.goals = new Array();
	

	

	this.removeGoal = function()  {
		if(seleectdGoal > 0) {
			this.goals.splice(seleectdGoal, 1);
			seleectdGoal =-1;
		} else if (seleectdGoal == 0 ) {
			this.goals.shift();
			seleectdGoal =-1;
		}
	}

	this.selectedGoal = function(sgoal) {		
		alert(selectedGoal);
		seleectdGoal = sgoal;
		alert(selectedGoal);
	}
    

    this.setparameter = function(groupIndex , paramIndex) {
    	parmeterGoal = groupIndex;
		selParam = paramIndex	
    }

    this.removeParameter = function() {
    	if(selParam > 0) {
			this.goals[seleectdGoal].parameters.splice(selParam, 1);
		} else if (selParam == 0 ) {
			this.goals[seleectdGoal].parameters.shift();		
		}
		parmeterGoal =-1;
    	selParam =-1;
    }



});