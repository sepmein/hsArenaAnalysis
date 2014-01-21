'use strict';



angular.module('hsArenaAnalysisApp')
	.filter('rarity',['cards', function(cards) {
		var rarity = cards.meta.cardRarity;
		return function(s){
			return rarity[s];
		};
	}])
	.filter('klass',['cards', function(cards) {
		var klass = cards.meta.cardClass;
		return function(s){
			return klass[s];
		};
	}])
	.filter('effect',['cards', function(cards) {
		var effect = cards.meta.cardEffect;
		return function(s){
			return s.split(',').map(function(seperatedString){
				return effect[seperatedString];
			}).join();
		};
	}])
	.filter('race',['cards', function(cards) {
		var race = cards.meta.cardRace;
		return function(s){
			return race[s];
		};
	}])
	.filter('type',['cards', function(cards) {
		var type = cards.meta.cardType;
		return function(s){
			return type[s];
		};
	}])
	.filter('set',['cards', function(cards) {
		var set = cards.meta.cardSet;
		return function(s){
			return set[s];
		};
	}]);