'use strict';

angular.module('hsArenaAnalysisApp')
  .controller('hsArenaAnalysisApp.controllers.header', ['$scope', '$rootScope', 'authentication',
    function($scope, $rootScope, authentication) {
      // Setup drop down menu
      $('.dropdown-toggle').dropdown();

      // Fix input element click problem
      $('.dropdown input, .dropdown label').click(function(e) {
        e.stopPropagation();
      });

      $scope.$on('$firebaseAuth:login', function() {
        $scope.userEmail = $rootScope.auth.user.email;
      });

      $scope.login = function(){
        authentication.login($scope.email, $scope.password, $scope.remenberMe);
      };

      $scope.logout = function(){
        authentication.logout();
      };

    }
  ]);