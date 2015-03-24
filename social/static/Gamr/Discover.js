'use strict';
angular.module('gamr')

    .controller('DiscoverCtrl',
    function DiscoverCtrl($scope, $rootScope, API){

        $scope.groups = [];

        var killJoined = function(){
            console.log("killJoined() called", $scope.groups.length, $scope.user.groups.length);
            for (var i = 0; i<$scope.groups.length; i++){
                for (var j = 0; j<$scope.user.groups.length; j++){
                    console.log("group_id:", $scope.groups[i].pk, "user.group_id:", $scope.user.groups.pk);
                    if ($scope.groups[i].pk===$scope.user.groups[j].pk){
                        $scope.groups.splice(i, 1);
                    }
                }
            }
        };

        var getGroups = function() {
            API.fetchUser().then(function (data) {
                $scope.user = data.results[0];
                console.log("fetchfetch:", $scope.user);
                API.listGroup()
                    .then(function (data) {
                        $scope.groups = data.results;
                        killJoined();
                        console.log("listGroups success", $scope.groups);
                    })
                ;
            });
        };
        getGroups();

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


        $scope.search = function(){
            API.searchGroup($scope.searchTerm)
                .then(function (data){
                    console.log(data);
                    $scope.groups = data.results;
                    killJoined();
                }, function (data){
                    console.log(data);
                })
            ;
        };


        $scope.joinGroup = function(pk){
            console.log("joinGroup", pk);
            API.joinGroup(pk)
                .then(function (data){
                    getGroups();
                    console.log("join group success", data)
                }, function (data){
                    console.log("join group failed", data)
                })
            ;
        }

    })
;