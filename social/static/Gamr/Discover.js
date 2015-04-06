'use strict';
angular.module('gamr')

    .controller('DiscoverCtrl',
    function DiscoverCtrl($scope, $rootScope, API){

        $scope.groups = [];

        var killJoined = function(){
            for (var i = 0; i<$scope.groups.length; i++){
                for (var j = 0; j<$scope.user.groups.length; j++){
                    if ($scope.groups[i].pk===$scope.user.groups[j].pk){
                        $scope.groups.splice(i, 1);
                    }
                }
            }
        };

        var getGroups = function() {
            API.fetchUser().then(function (data) {
                $scope.user = data.results[0];
                API.listGroup()
                    .then(function (data) {
                        $scope.groups = data.results;
                        killJoined();
                    })
                ;
            });
        };
        getGroups();


        $scope.search = function(){
            API.searchGroup($scope.searchTerm)
                .then(function (data){
                    $scope.groups = data.results;
                    killJoined();
                }, function (data){
                    console.log(data);
                })
            ;
        };


        $scope.joinGroup = function(pk){
            API.joinGroup(pk)
                .then(function (data){
                    getGroups();
                }, function (data){
                    console.log("join group failed", data)
                })
            ;
        }

    })
;