'use strict';

angular.module('hsArenaAnalysisApp')
  .controller('hsArenaAnalysis.controllers.user', ['$scope', '$firebase', 'FBUrl', '$rootScope',
    function($scope, $firebase, FBUrl, $rootScope) {
      // show adding view as default
      $scope.showAdding = 1;
      $scope.showDashBoard = 0;

      // TODO: test
      $scope.uid = $rootScope.auth.user.id;

      $scope.switchView = function() {
        $scope.showAdding = !$scope.showAdding;
        $scope.showDashBoard = !$scope.showDashBoard;
      };

      $scope.userLogs = $firebase(new Firebase(FBUrl + '/logs' + $scope.uid));

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

      $scope.submitLog = function() {
        // TODO: test, add some 
        $scope.submitLog.$push($scope.log);
      };
    }
  ]);