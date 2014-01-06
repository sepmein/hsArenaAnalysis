'use strict';

angular.module('hsArenaAnalysisApp')
  .controller('hsArenaAnalysisApp.controllers.user', ['$scope', '$firebase', 'FBURL', '$rootScope',
    function($scope, $firebase, FBURL, $rootScope) {
      // show adding view as default
      $scope.showAdding = 1;
      $scope.showDashBoard = 0;

      // TODO: test
      $scope.uid = $rootScope.auth.user.id;

      $scope.switchView = function() {
        $scope.showAdding = !$scope.showAdding;
        $scope.showDashBoard = !$scope.showDashBoard;
      };

      $scope.userLogs = $firebase(new Firebase(FBURL + '/logs/' + $scope.uid));

      $scope.submitLog = function() {
        // construct the log object to be pushed
        $scope.log = {
          uid: $scope.uid,
          proUsed: $scope.proUsed,
          proBanned: $scope.proBanned,
          winningNum: $scope.winningNum,
          losingNum: $scope.losingNum,
          bestCards: $scope.bestCards,
          worstCards: $scope.worstCards,
          bestCardsOp: $scope.bestCardsOp
        };
        $scope.userLogs.$add($scope.log);
      };
    }
  ]);