'use strict';

/* message system for the whole project */

angular.module('hsArenaAnalysisApp.services.message', [])
	.factory('message', ['$rootScope',

		function($rootScope) {
			return {
				success: function(msg) {
					$rootScope.$emit('message', msg, 'alert-success');
				},
				info: function(msg) {
					$rootScope.$emit('message', msg, 'alert-info');
				},
				warning: function(msg) {
					$rootScope.$emit('message', msg, 'alert-warning');
				},
				danger: function(msg) {
					$rootScope.$emit('message', msg, 'alert-danger');
				}
			};
		}
	]);