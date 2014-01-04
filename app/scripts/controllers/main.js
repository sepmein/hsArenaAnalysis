'use strict';

angular.module('hsArenaAnalysisApp')
	.controller('MainCtrl', ['$scope', 'authentication',
		function($scope, authentication) {

			var prologues = [
				'快在火炉旁找个位子坐下吧',
				'欢迎来到我的酒馆',
				'小伙子们，看看谁来啦！',
				'今晚累的够呛，但只要有客人来玩，我都欢迎',
				'吼吼吼，很高兴能再见到你',
				'哈，快找个位置坐下来'
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