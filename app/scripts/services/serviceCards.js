'use strict';

angular.module('hsArenaAnalysisApp.services.cards', [])
	.factory('cards', ['FBURL', '$firebase',

		function(FBURL, $firebase) {
			var ref = new Firebase(FBURL + '/cards'),
				$data = $firebase(ref.child('data')),
				$image = $firebase(ref.child('image'));

			var meta = {
				"cardRarity": {
					"legendary": "传说",
					"epic": "史诗",
					"rare": "稀有",
					"free": "基本",
					"common": "普通"
				},
				"cardClass": {
					"shaman": "萨满",
					"priest": "牧师",
					"rogue": "潜行者",
					"mage": "法师",
					"warrior": "战士",
					"paladin": "圣骑士",
					"neutral": "中立",
					"hunter": "猎人",
					"druid": "德鲁伊",
					"warlock": "术士"
				},
				"cardEffect": {
					"secret": "奥秘",
					"charge": "冲锋",
					"death_rattle": "亡语",
					"windfury": "风怒",
					"enrage": "激怒",
					"divine_shield": "圣盾",
					"stealth": "潜行",
					"choice": "抉择",
					"taunt": "嘲讽",
					"overload": "过载",
					"battlecry": "战吼",
					"combo": "连击",
					"spell_damage": "法术伤害",
					"silence": "沉默"
				},
				"cardRace": {
					"pirate": "海盗",
					"murloc": "鱼人",
					"demon": "恶魔",
					"beast": "野兽",
					"dragon": "龙"
				},
				"cardType": {
					"spell": "法术",
					"minion": "随从",
					"weapon": "武器"
				},
				"cardSet": {
					"reward": "纪念",
					"basic": "基本级",
					"missions": "奖励",
					"expert": "专家级"
				}
			};

			return {
				// randomCard: function() {
				// 	var random = Math.floor(Math.random * cards.length);
				// 	return cards[random];
				// },
				data: function(cb) {
					$data.$on('loaded', function(value) {
						cb(value);
					});
				},
				meta: meta,
				image: function(cb) {
					$image.$on('loaded', function(value) {
						cb(value);
					});
				}
			};
		}
	]);