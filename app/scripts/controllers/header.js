'use strict';

angular.module('hsArenaAnalysisApp')
  .controller('hsArenaAnalysisApp.controllers.header', ['$scope', '$rootScope',
    function($scope, $rootScope) {

      $scope.$on('$firebaseAuth:login', function() {
        $scope.userEmail = $rootScope.auth.user.email;

        //angularFire(new Firebase(FBURL + '/users/' + $scope.auth.id), $scope, 'user');
      });

    }
  ]);