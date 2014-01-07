'use strict';

angular.module('hsArenaAnalysisApp')
	.filter('hero', function() {
		return function(heroString) {
			switch (heroString) {
				case 'qs':
					return '圣骑士';
				case 'dz':
					return '潜行者';
				case 'sm':
					return '萨满';
				case 'lr':
					return '猎人';
				case 'dly':
					return '德鲁伊';
				case 'fs':
					return '法师';
				case 'ss':
					return '术士';
				case 'zs':
					return '战士';
				case 'ms':
					return '牧师';
			}
		};
	});