'use strict';

/**
 * @ngdoc function
 * @name gamr.controller:RestrictedCtrl
 * @description
 * # RestrictedCtrl
 * Controller of the gamr
 */
angular.module('gamr')
  .controller('RestrictedCtrl', function ($scope, $location) {
    $scope.$on('djangoAuth.logged_in', function() {
      $location.path('/');
    });
  });
