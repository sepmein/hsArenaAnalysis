'use strict';

angular.module('hsArenaAnalysisApp')
  .controller('hsArenaAnalysisApp.controllers.user', ['$scope', '$firebase', 'FBURL', '$rootScope', 'cards', 'filterFilter',
    function($scope, $firebase, FBURL, $rootScope, cards, filterFilter) {
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
          heroUsed: $scope.heroUsed,
          heroBanned: $scope.heroBanned,
          wins: $scope.wins,
          loses: $scope.loses,
          bestCards: $scope.bestCards,
          worstCards: $scope.worstCards,
          bestCardsOp: $scope.bestCardsOp
        };
        $scope.userLogs.$add($scope.log);
      };

      $scope.heros = ['qs', 'dz', 'sm', 'lr', 'dly', 'fs', 'ss', 'zs', 'ms'];

      // hero select functions
      $scope.selectHeroUsed = function(heroIndex) {
        $scope.heroUsed = $scope.heros[heroIndex];
      };
      $scope.redoHeroUsed = function() {
        $scope.heroUsed = null;
        $scope.heroBanned = [];
      };

      // hero banned functions
      $scope.heroBanned = [];
      $scope.selectHeroBanned = function(heroIndex) {
        var check = $scope.heroBanned.length <= 2 && $scope.heroBanned[0] !== $scope.heros[heroIndex] && $scope.heroBanned[1] !== $scope.heros[heroIndex] && $scope.heros[heroIndex] !== $scope.heroUsed;
        if (check) {
          $scope.heroBanned.push($scope.heros[heroIndex]);
        }
      };
      $scope.redoHeroBanned = function() {
        $scope.heroBanned = [];
      };

      //battle results functions
      $scope.wins = 0;
      $scope.onChangeWins = function() {
        if ($scope.wins <= 12 && $scope.wins >= 0) {
          if ($scope.wins <= 11) {
            $scope.loses = 3;
            $scope.disableLoses = true;
          } else {
            $scope.disableLoses = false;
          }
        }
      };

      $scope.loses = 3;
      $scope.disableLoses = false;

      // dealing with cards
      $scope.cards = cards.allCards();

      $scope.isShownBestCard = false;
      $scope.getBestCard = function() {
        $scope.bestCardModel = filterFilter($scope.cards, {
          name: $scope.bestCardSearch
        })[0];
        var hasResult = $scope.bestCardModel.hasOwnProperty('imageUrl') && $scope.bestCardModel.hasOwnProperty('id');
        var notNull = ($scope.bestCardSearch !== '');
        if (hasResult && notNull) {
          $scope.isShownBestCard = true;
          $scope.bestCard = $scope.bestCardModel.id;
          console.log($scope.bestCardModel);
        } else {
          $scope.isShownBestCard = false;
        }
      };
    }
  ]);