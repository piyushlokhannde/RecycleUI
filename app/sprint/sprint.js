'use strict';

var sprintapp = angular.module('myApp.sprint', ['ngRoute', 'ui.bootstrap', 'ngResource']);



sprintapp.factory('MasterGoalService', function ($resource) {
    return $resource('http://localhost:8080/getMasterGoals');
});

sprintapp.factory('MasterParamService', function ($resource) {
    return $resource('http://localhost:8080/getSprintParameters');
});

sprintapp.factory('MasterTeamService', function ($resource) {
    return $resource('http://localhost:8080/getTeams');
});

sprintapp.factory('MasterTeamMemberService', function ($resource) {
    return $resource('http://localhost:8080/getTeamMembers');
});

sprintapp.factory('SprintService', function ($resource) {
    return $resource('http://localhost:8080/createsprint');
});

sprintapp.factory('GetAllSprintSummary', function ($resource) {
    return $resource('http://localhost:8080/getAllSprintSummary');
});

sprintapp.factory('GetSprintData', function ($resource) {
    return $resource('http://localhost:8080/getSprintData/:sprintId', {sprintId: '@_sprintId' });
});
sprintapp.factory('SprintHealthService', function ($resource) {

    return $resource('http://10.253.191.49:8080/getSprintHealthCount');
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

sprintapp.controller('sprintCtrl',function($scope, $uibModal, MasterTeamService, MasterTeamMemberService,SprintHealthService, SprintService) {

	var seleectdGoal=-1;
	var parmeterGoal =-1;
    var selParam =-1;

 //  $scope.teams = MasterTeamService.query();
  //	$scope.teamMemDropDown = MasterTeamMemberService.query();
   //alert(teams);
   $scope.setNoDays =function () {

   			//var startDate = $scope.sprint.endDate.getTime();
   		var  startdate =$scope.sprint.startDate.getTime();
   		var enddate = $scope.sprint.endDate.getTime();
   		//alert(endDate);
   		 $scope.sprint.noOfDays = (enddate-startdate)/ (1000*60*60*24);


   }
//Method to fetch Project Level Team Member avg
     
     $scope.getProjectLevelAvg = function() {
     	//alert("fetching AVG");
var test = new Object();
     	 test = SprintHealthService.get(
     	 	function(success) {
                $scope.projectLevelAvg = success.value;
       //         alert("Sucess"+angular.toJson(success));
                
            },
            function(err) {
        //        alert("Team Member Fetched error");
       //         alert(angular.toJson(err));
                
            }
            );
     	
     //	alert(angular.toJson(test) +" and setvalue:"+$scope.projectLevelAvg );
     };

   $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }















   $scope.openStartDate = function() {
   	alert($scope.sddatapicker);
    	$scope.sddatapicker = true;

  	};



  
	
	$scope.goals = new Array();
	$scope.sprint = new Object();
	$scope.sprint.sprintStatus = "Draft";

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


	$scope.showMsg = function(){
        
    	var dialogInst = $uibModal.open({
    		templateUrl: 'sprint/msgpopup.html',
    		controller: 'msgpopupCntrl',
    		size: 'sm',
    		resolve: {
    			msg: function () {
    				return $scope.message;
    			}
    		}
		});

		dialogInst.result.then(function () {
			
				
		}, function () {
			 // $log.info('Modal dismissed at: ' + new Date());
			});
     };


	$scope.loadSprint = function(){
        
    	var dialogInst = $uibModal.open({
    		templateUrl: 'sprint/getAllSprintSummaryPopup.html',
    		controller: 'GetAllSprintSummaryCntrl',
    		size: 'lg',
    		resolve: {
    			noparameter: function () {
    				return "";
    			}
    		}
		});

		dialogInst.result.then(function (sprintData) {
			$scope.sprint = sprintData;
			$scope.teams = sprintData.teamMemberTOs;
			$scope.goals = sprintData.sprintGoalTOs;
				
		}, function () {
			 // $log.info('Modal dismissed at: ' + new Date());
			});
     };

  
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
		                                
                                var projectAvg = parseInt($scope.projectLevelAvg,10);
                                //var teamList = $scope.teamMemDropDown;
                                var sum=0;
                                if(teamList.length ==0){
                                	return;
                                }

								for (var i=0;i<teamList.length;i++){

                                	if(teamList[i].teamMemberTotal== null || isNaN(teamList[i].teamMemberTotal)) {
                                         teamList[i].teamMemberTotal = 21;
                                         
                                     }
                                     sum = parseInt(sum,10) + parseInt(teamList[i].teamMemberTotal,10);

                                }
								if(isNaN(sum)) {
                                	sum = 0;
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
		$scope.calculatePercentage($scope.teamMembers);	
	}

	$scope.fetchTeamData = function() {
		if(!$scope.teams) {			
			$scope.teams = MasterTeamService.query();
  			$scope.teamMemDropDown = MasterTeamMemberService.query();
		}
		
	}

	

  
		//Pange function start
	$scope.commitSprint = function() {

		$scope.message = new Array();
			 $scope.sprint.sprintStatus = "Commit";
         		  $scope.message.push("Sprint "+$scope.sprint.name + " is Commited.");
         		  $scope.message.push("Expected Points To be Achieved: 315");
         		  $scope.message.push("Actual Points Achieved: 326");
		 // $scope.message = $scope.sprint.name + ", Sprint Started. <br> Please Enter Expected Value";
          $scope.showMsg();
	}


	$scope.endSprint = function() {
			$scope.message = new Array();
			 $scope.sprint.sprintStatus = "End";
         		  $scope.message.push($scope.sprint.name + ", Sprint Ended.");
         		  $scope.message.push("Please Enter the Actual Values for the Parameters.");
		 // $scope.message = $scope.sprint.name + ", Sprint Started. <br> Please Enter Expected Value";
          $scope.showMsg();

	}


	$scope.startSprint = function() {
			 $scope.message = new Array();
			 $scope.sprint.sprintStatus = "Start";
         		  $scope.message.push($scope.sprint.name + ", Sprint Started.");
         		  $scope.message.push("Please Enter the Expected Values for the Parameters.");
		 // $scope.message = $scope.sprint.name + ", Sprint Started. <br> Please Enter Expected Value";
          $scope.showMsg();

	}

	$scope.save  = function() {

		
		$scope.sprint.teamId = $scope.selectedTeam.id;
		$scope.sprint.teamName = $scope.selectedTeam.name;
		$scope.sprint.sprintGoalTOs = $scope.goals;
		$scope.sprint.teamMemberTOs = $scope.teamMembers;
		


		SprintService.save(angular.toJson($scope.sprint),
         function(success) {
         		 $scope.message = new Array();
         		  $scope.message.push($scope.sprint.name + ", Sprint Saved Successfully.");
               
                $scope.showMsg();
              //  angular.toJson(success);
                $scope.sprint.id = success.value;
                
            },
            function(err) {
                alert("Error in Saving the Sprint");
                //alert(angular.toJson(err));
                
            }
            );
	}
	//Pange function start

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




sprintapp.controller('GetAllSprintSummaryCntrl', function($scope, $uibModalInstance, noparameter,GetAllSprintSummary,GetSprintData) {

	
	
		$scope.sprintSummayList =GetAllSprintSummary.query();



		  $scope.submitUser = function () {
		
			$uibModalInstance.close("$scope.goalList");
		//	$scope.usr = {name: '', job: '', age: '', sal: '', addr:''};
  		};
		$scope.selectedSprint = function (index) {
			alert("selected sprint"+ $scope.sprintSummayList[index].name);	

		var goal =	GetSprintData.get({"sprintId": $scope.sprintSummayList[index].id});
		alert(goal);
			$uibModalInstance.close("goal");
		  };
});


sprintapp.controller('msgpopupCntrl', function($scope, $uibModalInstance, msg) {

	
	
		
		$scope.msgList = msg;

		  $scope.cancel = function () {
			
			$uibModalInstance.close("success");
		//	$scope.usr = {name: '', job: '', age: '', sal: '', addr:''};
  		};
		
});
