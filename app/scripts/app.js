'use strict';

angular.module('hsArenaAnalysisApp', [
  'firebase',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'hsArenaAnalysisApp.config',
  'hsArenaAnalysisApp.services.authentication',
  'hsArenaAnalysisApp.services.message',
  'hsArenaAnalysisApp.services.cards'
]);