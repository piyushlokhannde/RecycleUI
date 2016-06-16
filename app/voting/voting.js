'use strict';

angular.module('myApp.voting', ['ngRoute', 'ngResource', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/voting', {
    templateUrl: 'voting/voting.html',
    controller: 'votingCtrl'
  });
}])

.factory('MemberService', function ($resource) {
    return $resource('http://localhost:8080/getTeamMemberList/:sprintId',{sprintId: "@sprintId"});
})
.factory('QuestionService', function ($resource) {
    return $resource('http://127.0.0.1:8080/getSprintFeedbackData/:id');
})
.factory('QuestionServiceForSave', function ($resource) {
    return $resource('http://127.0.0.1:8080/saveSprintFeedback/');
})
.factory('VotingService', function ($resource) {
    return $resource('http://127.0.0.1:8080/saveVotingDetail/:teammember',{teammember: "@teammember"});
})


.controller('votingCtrl', function($scope , $http, $rootScope, $location ,MemberService,QuestionService,QuestionServiceForSave) {

//method navigate
$scope.go = function ( path ) {
  $location.path( path );
};


var VotingDetail  = new Object();
VotingDetail.sprintId = "";
VotingDetail.member = new Object;
VotingDetail.rating = "";


/*$http.defaults.headers.put = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
        };
        $http.defaults.useXDomain = true;*/



$scope.getVotingQues = function () {



$http({
    url: "http://127.0.0.1:8080/getSprintFeedbackData/", 
    method: "GET",
    params: {"id": "1"}
 });


   /* $http.get('http://127.0.0.1:8080/getSprintFeedbackData').
        success(function(data) {
            alert("data Recieved");
            $scope.qlist = data;
            
            alert($scope.qlist);
        },
            function(err) {
                alert("Team Member Not saved");
                alert(angular.toJson(err));
                
            });*/
}

 $scope.rate = 0;
  $scope.max = 5;
  $scope.isReadonly = false;
$rootScope.backImg = 'images/voting.png'; 

//Method
$scope.hoveringOver = function(value,index) {
    try{
    $scope.overStar = value;
    
    if(typeof percent == 'undefined') {
        $scope.percent = new Array($scope.qlist.length);
    }
    $scope.percent[index] = 100 * (value / $scope.max);
     // alert('over overStar'+$scope.overStar+'value'+value+' and index'+index+'percent'+$scope.percent[index]+' length:'+$scope.percent.length);
} catch(errr){
    alert(errr);
}
  };


// Save Voting Details.
    $scope.submitVoting = function(){
        
        QuestionServiceForSave.save(angular.toJson($scope.qlist),
         function(success) {
                alert("Team Member Saved");
                alert(angular.toJson(success));
                
            },
            function(err) {
                alert("Team Member Not saved");
                alert(angular.toJson(err));
                
            }
            );

    }

    $scope.getArray = function(listLength){
        // alert( Math.round(listLength*(1/3)) );
        return new Array(Math.round(listLength*(1/3)));
        
    }

//Save membner
    $scope.saveMember = function() {  	

    	MemberService.save(angular.toJson($scope.TeamMember),

    		function(success) {
    			alert("Team Member Saved");
    			alert(angular.toJson(success));
    			
    		},
    		function(err) {
    			alert("Team Member Not saved");
    			alert(angular.toJson(err));
    			
    		}
    		);
        
    }

    //Method for fetching team list.
$scope.getTeamList = function(id) {

    
 var sprintObject = new Object();
         sprintObject.id = id;
         $scope.teamList=new Array();
        $scope.teamList = MemberService.query({id: sprintObject.id},

            function(success) {
                
                alert(angular.toJson(success));
                
            },
            function(err) {
                alert("Team Member Fetched error");
                alert(angular.toJson(err));
                
            }
            );  
}
//Method
    $scope.getSprintDetails = function() {

        var sprintObject = new Object();
         sprintObject.id = "1";
         $scope.qlist=new Array();
    	$scope.qlist = QuestionService.query({id: sprintObject.id});
        // $scope.qlist = sprintObject.votingQue;

    	// alert("Team Member Fetched"+$scope.qlist);

    }


    //Method
    $scope.memberChanged = function(member){
        
     for(var i = 0; i < $scope.teamList.length; i++) {
        if($scope.teamList[i].empName == member.name.empName) {

        $scope.teamList[i].isSelected = 'true';
        }
    }
    }
    /*$scope.$watch('selectedMember', function(newvalue,oldvalue) {
        alert("watch called");
        $scope.selectedMember.isSelected=true;
            });*/
})
.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
})


;

