'use strict';

angular.module('hsArenaAnalysisApp')
  .controller('hsArenaAnalysisApp.controllers.header', ['$scope', '$rootScope',
    function($scope, $rootScope) {
      // Setup drop down menu
      $('.dropdown-toggle').dropdown();

      // Fix input element click problem
      $('.dropdown input, .dropdown label').click(function(e) {
        e.stopPropagation();
      });
      
      $scope.$on('$firebaseAuth:login', function() {
        $scope.userEmail = $rootScope.auth.user.email;
      });

    }
  ]);