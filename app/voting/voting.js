'use strict';

angular.module('myApp.voting', ['ngRoute', 'ngResource', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/voting', {
    templateUrl: 'voting/voting.html',
    controller: 'votingCtrl'
  });
}])

.factory('MemberService', function ($resource) {
    return $resource('http://10.253.191.67:3000/teammembers/:teammember',{teammember: "@teammember"});
})

.controller('votingCtrl', function($scope , MemberService) {


 $scope.rate = 0;
  $scope.max = 10;
  $scope.isReadonly = false;

$scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };


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


    $scope.getMember = function() {

    	 
    	$scope.TeamMember = MemberService.get({teammember: $scope.TeamMember.ID}

    		);
    	alert("Team Member Fetched");

    }
});

