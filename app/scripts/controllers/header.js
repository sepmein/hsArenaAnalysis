'use strict';

angular.module('hsArenaAnalysisApp')
  .controller('hsArenaAnalysisApp.controllers.header', ['$scope', '$rootScope', 'authentication', '$location', 
    function($scope, $rootScope, authentication, $location) {
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
        authentication.login($scope.user.email, $scope.user.password, $scope.user.remenberMe);
      };

      $scope.logout = function(){
        authentication.logout();
        $location.path('/');
      };

    }
  ]);