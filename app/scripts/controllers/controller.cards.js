'use strict';

angular.module('hsArenaAnalysisApp')
	.controller('hsArenaAnalysisApp.controllers.cards', ['$scope', 'cards',
		function($scope, cards) {
			cards.data(function(val){
				$scope.cards = [];
				for (var k in val){
					$scope.cards.push(val[k]);
				}
			});
		}
	]);