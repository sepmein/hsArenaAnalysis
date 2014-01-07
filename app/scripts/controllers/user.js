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
          bestCards: $scope.bestCard,
          worstCards: $scope.worstCard,
          bestCardsOp: $scope.bestCardOp,
          date: Date.now()
        };
        $scope.userLogs.$add($scope.log);
      };

      $scope.heros = ['paladin', 'rogue', 'shaman', 'hunter', 'druid', 'mage', 'warlock', 'warrior', 'priest'];

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
      $scope.loses = 3;
      $scope.losesMax = 3;
      $scope.onChangeWins = function() {
        if ($scope.wins <= 12 && $scope.wins >= 0) {
          if ($scope.wins <= 11) {
            // 小于12胜，必然3败
            $scope.loses = 3;
            $scope.losesMax = 3;
            $scope.disableLoses = true;
          } else {
            $scope.disableLoses = false;
            // 等于12胜，不可能3败
            $scope.loses = 2;
            $scope.losesMax = 2;
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

      $scope.isShownWorstCard = false;
      $scope.getWorstCard = function() {
        $scope.worstCardModel = filterFilter($scope.cards, {
          name: $scope.worstCardSearch
        })[0];
        var hasResult = $scope.worstCardModel.hasOwnProperty('imageUrl') && $scope.worstCardModel.hasOwnProperty('id');
        var notNull = ($scope.worstCardSearch !== '');
        if (hasResult && notNull) {
          $scope.isShownWorstCard = true;
          $scope.worstCard = $scope.worstCardModel.id;
          console.log($scope.worstCardModel);
        } else {
          $scope.isShownWorstCard = false;
        }
      };

      $scope.isShownBestCardop = false;
      $scope.getBestCardop = function() {
        $scope.bestCardopModel = filterFilter($scope.cards, {
          name: $scope.bestCardopSearch
        })[0];
        var hasResult = $scope.bestCardopModel.hasOwnProperty('imageUrl') && $scope.bestCardopModel.hasOwnProperty('id');
        var notNull = ($scope.bestCardopSearch !== '');
        if (hasResult && notNull) {
          $scope.isShownBestCardop = true;
          $scope.bestCardop = $scope.bestCardopModel.id;
          console.log($scope.bestCardopModel);
        } else {
          $scope.isShownBestCardop = false;
        }
      };
    }
  ]);