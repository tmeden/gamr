'use strict';
angular.module('gamr')

    .controller('ProfileCtrl',
    function ProfileCtrl($scope, $rootScope, $routeParams, API){

        $scope.profile = {};

        API.readProfile($routeParams.id).then(function (data) {
            $scope.profile = data;
        });

    })
;