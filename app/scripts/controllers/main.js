'use strict';

angular.module('hsArenaAnalysisApp')
	.controller('MainCtrl', ['$scope', 'authentication',
		function($scope, authentication) {

			var prologues = [
				'哈哈，快找个位子坐下吧',
				'快在火炉旁找个位子坐下吧',
				'那个啥那个啥',
				'小伙子们，看看谁来啦！',
				'今晚累的够呛，但只要有客人来玩，我都欢迎'
			];
			$scope.prologue = prologues[Math.floor(Math.random() * prologues.length)];

			$scope.createUser = function() {
				console.log('clicked');
				authentication.createUser($scope.email, $scope.password, function(err, user) {
					if (!err) {
						console.log('create user success!');
						console.log('the user is :');
						console.log(user);
					} else {
						$scope.err = err;
					}
				});
			};
		}
	]);