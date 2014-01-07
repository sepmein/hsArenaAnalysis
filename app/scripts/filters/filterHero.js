'use strict';

angular.module('hsArenaAnalysisApp')
	.filter('hero', function() {
		return function(heroString) {
			switch (heroString) {
				case 'paladin':
					return '圣骑士';
				case 'rogue':
					return '潜行者';
				case 'shaman':
					return '萨满';
				case 'hunter':
					return '猎人';
				case 'druid':
					return '德鲁伊';
				case 'mage':
					return '法师';
				case 'warlock':
					return '术士';
				case 'warrior':
					return '战士';
				case 'priest':
					return '牧师';
			}
		};
	});