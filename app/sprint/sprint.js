'use strict';

var sprintapp = angular.module('myApp.sprint', ['ngRoute', 'ui.bootstrap', 'ngResource']);



sprintapp.factory('MasterGoalService', function ($resource) {
    return $resource('http://10.253.191.32:8080/getMasterGoals');
})


function caluclateTotal(arrayObject) {
	var total = 0;
	angular.forEach(arrayObject, function(value, key){
		var valueToAdd =0;
		if(isNaN(value.percent) == false) {
				valueToAdd = value.percent;
		} 
		total = total + Number(valueToAdd);
	});

	return total;
}


sprintapp.controller('DialogParamCtrl', function($scope, $uibModalInstance, paramarray, $log, goalListModel) {

	$scope.paramList = paramarray;	
	$scope.paramTotal = caluclateTotal(paramarray);

	$scope.calTotalPer = function () {		
		$scope.paramTotal = caluclateTotal($scope.paramList);
	}


  	$scope.actions = [
    	"Action Param", "Another Action Param", "Something else here Param"
  	];
  
	$scope.change = function(index){
		var param = goalListModel.createNewParameter()
		param.name = $scope.actions[index];		
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




sprintapp.controller('DialogInstCtrl', function($scope, $uibModalInstance, goalarray, $log, goalListModel) {

	$scope.goalList = goalarray;
	$scope.goalTotal = caluclateTotal(goalarray);

	$scope.calTotalPer = function () {	
		$scope.goalTotal = caluclateTotal($scope.goalList );
	}


  	$scope.actions = [
    	"Action", "Another Action", "Something else here"
  	];
  
	$scope.change = function(index){
		alert("ddd");
		
		var goal = goalListModel.createNewGoal();
		goal.parameters.push(goalListModel.createNewParameter());
		goal.name = $scope.actions[index];
		goal.percent =0;
  		$scope.goalList.push(goal); 
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

.controller('sprintCtrl',function($scope, $uibModal, goalListModel) {

	
	var goal  = goalListModel.createNewGoal();
	goalListModel.addNewGoal(goal);
	$scope.goals = goalListModel.goals;


	$scope.removeGoal = function () {	
		goalListModel.removeGoal();
	}

	$scope.setgoal = function(sgoal) {			
		goalListModel.selectedGoal(sgoal);
	} 

	$scope.setparameter = function(groupIndex , paramIndex) {
		goalListModel.setparameter(groupIndex , paramIndex);	
	}


	$scope.removeParam = function() {
		goalListModel.removeParameter();
	
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
    				  return goal.parameters;
    			}
    		}
		});
		dialogInst.result.then(function (retunParamlist) {
			    	goal.parameters = retunParamlist;
		}, function () {
			 // $log.info('Modal dismissed at: ' + new Date());
			});
    };

});




sprintapp.service("goalListModel", function(MasterGoalService) {

	var seleectdGoal=-1;
	var parmeterGoal =-1;
    var selParam =-1;

	this.goals = new Array();

	this.createNewGoal = function() {
		alert("www");

		MasterGoalService.query(function (data) {
			alert(data);

		});

    	
		
		var goal = new Object();
		goal.name = "Goal1";
		goal.percent = 0;		
		var paramList = new Array();	
		paramList.push(this.createNewParameter());
		goal.parameters = paramList;
		return goal;
	}

	this.addNewGoal = function(newGoal) {
		this.goals.push(newGoal);

	}

	this.createNewParameter = function() {
		var param1 = new Object();
		param1.name = "Param1";
		param1.percent =0;
		return param1;
	}

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
		seleectdGoal = sgoal;
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