'use strict';
angular.module('gamr')

    .controller('ProfileCtrl',
    function ProfileCtrl($scope, $rootScope, $routeParams, API){

        console.log("profile happening");

        $scope.profile = {};

        var getProfile = function(pk) {
            console.log("profile:", pk);
            API.readProfile(pk).then(function (data) {
                $scope.profile = data;
                console.log(data);
            });
        };
        getProfile($routeParams.id);

        //var listGroups = function() {
        //    API.listGroup()
        //        .then(function (data) {
        //            $scope.groups = data.results;
        //            killJoined();
        //            console.log("listGroups success", $scope.groups);
        //        })
        //    ;
        //};
        //listGroups();


        //$scope.search = function(){
        //    API.searchGroup($scope.searchTerm)
        //        .then(function (data){
        //            console.log(data);
        //            $scope.groups = data.results;
        //            killJoined();
        //        }, function (data){
        //            console.log(data);
        //        })
        //    ;
        //};
        //
        //
        //$scope.joinGroup = function(pk){
        //    console.log("joinGroup", pk);
        //    API.joinGroup(pk)
        //        .then(function (data){
        //            getGroups();
        //            console.log("join group success", data)
        //        }, function (data){
        //            console.log("join group failed", data)
        //        })
        //    ;
        //}

    })
;