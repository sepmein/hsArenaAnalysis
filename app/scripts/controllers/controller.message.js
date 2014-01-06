'use strict';

angular.module('hsArenaAnalysisApp')
	.controller('hsArenaAnalysisApp.controllers.message', ['$rootScope','$scope', '$timeout',
		function($rootScope, $scope, $timeout) {
			$rootScope.$on('message',function(event, msg, type){
				$scope.message = msg;
				$scope.type = type;
				$scope.showMessage();
				// hide message bar after 5s
				$timeout(function(){
					$scope.hideMessage();
				}, 5000);
			});
			$scope.showMessage = function(){
				$scope.show = 1;
			};
			$scope.hideMessage = function(){
				$scope.show = 0;
			};
		}
	]);