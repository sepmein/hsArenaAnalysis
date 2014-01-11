'use strict';

angular.module('hsArenaAnalysisApp')
	.controller('hsArenaAnalysisApp.controllers.cards', ['$scope', 'cards',
		function($scope, cards) {
			$scope.cards = cards.allCards();

			

		}
	]);