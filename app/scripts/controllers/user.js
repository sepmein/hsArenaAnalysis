'use strict';

angular.module('hsArenaAnalysisApp')
  .controller('hsArenaAnalysisApp.controllers.user', ['$scope', '$firebase', 'FBURL', '$rootScope', 'cards', 'filterFilter',
    function($scope, $firebase, FBURL, $rootScope, cards, filterFilter) {

      /** configuration
       * show adding view as default
       */

      $scope.showAdding = 1;
      $scope.showDashBoard = 0;

      $scope.switchView = function() {
        $scope.showAdding = !$scope.showAdding;
        $scope.showDashBoard = !$scope.showDashBoard;
      };



      /**
       * submit function
       */
      $scope.uid = $rootScope.auth.user.id;
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


      /**
       * hero select functions
       */

      $scope.heros = ['paladin', 'rogue', 'shaman', 'hunter', 'druid', 'mage', 'warlock', 'warrior', 'priest'];

      $scope.selectHeroUsed = function(heroIndex) {
        $scope.heroUsed = $scope.heros[heroIndex];
      };
      $scope.redoHeroUsed = function() {
        $scope.heroUsed = null;
        $scope.heroBanned = [];
      };

      /**
       * hero banned functions
       */
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


      /**
       * battle results function
       */
      $scope.wins = 0;
      $scope.loses = 3;
      $scope.losesMax = 3;
      $scope.disableLoses = false;
      $scope.onChangeWins = function() {
        if ($scope.wins <= 12 && $scope.wins >= 0) {
          if ($scope.wins <= 11) {
            // 小于12胜，必然3败
            // BUG: input被diable之后，上面的败场数无法正确显示
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


      /**
       * card search functions
       * TODO: make a directive for cards
       */
      $scope.cards = {
        data: [],
        image: {}
      };
      cards.data(function(val) {
        $scope.$emit('cardsLoaded');
        for (var k in val) {
          $scope.cards.data.push(val[k]);
        }
        console.log($scope.cards.data);
      });
      cards.image(function(val) {
        $scope.cards.image = val;
        $scope.$emit('imageUrlLoaded');
      });

      $scope.isShownBestCard = false;
      $scope.getBestCard = function() {
        $scope.bestCardModel = filterFilter($scope.cards.data, {
          name: $scope.bestCardSearch
        })[0];
        var hasResult = $scope.bestCardModel.hasOwnProperty('imageUrl') && $scope.bestCardModel.hasOwnProperty('id');
        var notNull = ($scope.bestCardSearch !== '');
        if (hasResult && notNull) {
          $scope.isShownBestCard = true;
          $scope.bestCard = $scope.bestCardModel.id;
          // console.log($scope.bestCardModel);
        } else {
          $scope.isShownBestCard = false;
        }
      };

      $scope.isShownWorstCard = false;
      $scope.getWorstCard = function() {
        $scope.worstCardModel = filterFilter($scope.cards.data, {
          name: $scope.worstCardSearch
        })[0];
        var hasResult = $scope.worstCardModel.hasOwnProperty('imageUrl') && $scope.worstCardModel.hasOwnProperty('id');
        var notNull = ($scope.worstCardSearch !== '');
        if (hasResult && notNull) {
          $scope.isShownWorstCard = true;
          $scope.worstCard = $scope.worstCardModel.id;
          // console.log($scope.worstCardModel);
        } else {
          $scope.isShownWorstCard = false;
        }
      };

      $scope.isShownBestCardop = false;
      $scope.getBestCardop = function() {
        $scope.bestCardopModel = filterFilter($scope.cards.data, {
          name: $scope.bestCardopSearch
        })[0];
        var hasResult = $scope.bestCardopModel.hasOwnProperty('imageUrl') && $scope.bestCardopModel.hasOwnProperty('id');
        var notNull = ($scope.bestCardopSearch !== '');
        if (hasResult && notNull) {
          $scope.isShownBestCardop = true;
          $scope.bestCardop = $scope.bestCardopModel.id;
          // console.log($scope.bestCardopModel);
        } else {
          $scope.isShownBestCardop = false;
        }
      };



      /**
       * sync with firebase
       */
      $scope.userLogs = $firebase(new Firebase(FBURL + '/logs/' + $scope.uid));
      $scope.userLogsIndex = $scope.userLogs.$getIndex();
      $scope.userLogsValue = function() {
        var values = [];
        for (var i = $scope.userLogsIndex.length - 1; i >= 0; i--) {
          values.push($scope.userLogs[$scope.userLogsIndex[i]]);
        }
        return values;
      };


      /**
       * statistic functions
       * TODO: 胜场曲线图，职业使用次数统计，被ban次数统计，职业偏好，职业胜率图，奖励分析
       */

      //无数据提醒
      $scope.noDataWarning = 0;

      $scope.statistic = {
        wins: function(d) {
          var winsRate = [];
          for (var k in d) {
            var v = d[k];
            winsRate.push({
              x: v.date,
              y: Math.floor(v.wins / (v.wins + 3) * 100)
            });
          }
          return [{
            values: winsRate,
            key: '胜率',
            color: '#ff9fe0'
          }];
        }
      };

      $scope.userLogs.$on('loaded', function(d) {
        // console.log($scope.statistic.wins(d));
        var winsValue = $scope.statistic.wins(d);
        // drawing wins by nvd3
        nv.addGraph(function() {
          var chart = nv.models.lineChart().forceY([0, 100]);
          chart.xAxis
            .axisLabel('Time')
            .tickFormat(function(d) {
              return d3.time.format('%b %d')(new Date(d));
            });

          chart.yAxis
            .axisLabel('胜率 (%)');

          d3.select('#chart svg')
            .style('height', 200).style('width', 400)
            .datum(winsValue)
            .transition().duration(500)
            .call(chart);

          nv.utils.windowResize(chart.update);

          return chart;
        });
      });

      $scope.totalWins = function() {
        if ($scope.userLogsValue()[0]) {
          // firebase data has been loaded
          var total = 0;
          for (var i = $scope.userLogsValue().length - 1; i >= 0; i--) {
            total += $scope.userLogsValue()[i].wins;
          }
          return total;
        } else {
          return 'loading';
        }
      };

      $scope.averageWins = function() {
        if ($scope.userLogsValue()[0]) {
          return $scope.totalWins() / $scope.userLogsIndex.length;
        } else {
          return 'loading';
        }
      };


    }
  ]);