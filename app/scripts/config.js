'use strict';

angular.module('hsArenaAnalysisApp.config', []);

angular.module('hsArenaAnalysisApp').config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainCtrl'
		})
		.when('/user/:id', {
			templateUrl: 'views/user.html',
			authRequired: true
		})
		.when('/cards', {
			templateUrl: 'views/cards.html'
		})
		.otherwise({
			redirectTo: '/'
		});
})

//firebase url as FBURL
.constant('FBURL', 'https://lushi.firebaseio.com')

.run(['$firebaseAuth', 'FBURL', '$rootScope',
	function($firebaseAuth, FBURL, $rootScope) {
		$rootScope.auth = $firebaseAuth(new Firebase(FBURL), {
			simple: true,
			path: '/',
			callback: function() {
				//null for now
			}
		});
	}
]);