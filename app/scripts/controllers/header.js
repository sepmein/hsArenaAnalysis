'use strict';

angular.module('hsArenaAnalysisApp')
  .controller('hsArenaAnalysisApp.controllers.header', ['$scope', '$rootScope', 'authentication', '$location', 'message',
    function($scope, $rootScope, authentication, $location, message) {
      // Setup drop down menu
      $('.dropdown-toggle').dropdown();

      // Fix input element click problem
      $('.dropdown input, .dropdown label').click(function(e) {
        e.stopPropagation();
      });

      $scope.$on('$firebaseAuth:login', function() {
        $scope.userEmail = $rootScope.auth.user.email;
        message.success('登录成功');
        // hide the login spinner
        $scope.loginStatus = 0;

      });

      $scope.$on('$firebaseAuth:error', function(event, error) {
        switch (error.code) {
          case 'INVALID_PASSWORD':
            message.warning('密码错误');
            break;
          case 'EMAIL_TAKEN':
            message.warning('该email已注册');
            break;
          case 'INVALID_EMAIL':
            message.warning('邮件格式不正确');
            break;
        }
        // hide the login spinner
        $scope.loginStatus = 0;
      });

      $scope.loginStatus = 0;

      $scope.login = function(e) {

        this._login = function() {
          authentication.login($scope.user.email, $scope.user.password, $scope.user.remenberMe);
          // show the login spinner
          $scope.loginStatus = 1;
        };

        if (e) {
          // called by key press
          if (e.which === 13) {
            this._login();
          }
        } else {
          this._login();
        }

      };

      $scope.logink = function(e) {
        console.log(e);
      };

      $scope.logout = function() {
        authentication.logout();
        $location.path('/');
      };

    }
  ]);