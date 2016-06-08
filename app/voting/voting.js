'use strict';

angular.module('myApp.voting', ['ngRoute', 'ngResource'])

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
    $scope.saveMember = function() {  	

    	MemberService.save(angular.toJson($scope.TeamMember));
        alert("Team Member Saved");
    }


    $scope.getMember = function() {

    	 
    	$scope.TeamMember = MemberService.get({teammember: $scope.TeamMember.ID});
    	alert("Team Member Fetched");

    }
});

