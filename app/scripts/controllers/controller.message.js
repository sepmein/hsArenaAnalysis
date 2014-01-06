'use strict';

angular.module('hsArenaAnalysisApp')
	.controller('hsArenaAnalysisApp.controllers.message', ['$rootScope','$scope', 'message',
		function($rootScope, $scope) {
			$rootScope.$on('message',function(event, msg, type){
				$scope.message = msg;
				$scope.type = type;
			});
		}
	]);