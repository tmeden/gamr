'use strict';
angular.module('gamr')

    .controller('BrowseSearchGroupCtrl',
    function BrowseSearchGroupCtrl($scope, $rootScope, GroupFactory){

        $scope.groups = [];

        var listGroups = function() {
            GroupFactory.list()
                .then(function (data) {
                    $scope.groups = data.results;
                    console.log("listGroups success", $scope.groups);
                })
            ;
        };
        listGroups();


        $scope.search = function(){
            GroupFactory.search($scope.searchTerm)
                .then(function (data){
                    console.log(data);
                    $scope.groups = data;
                }, function (data){
                    console.log(data);
                })
            ;
        };


        $scope.joinGroup = function(pk){
            GroupFactory.join(pk)
                .then(function (data){
                    console.log("join group success", data)
                }, function (data){
                    console.log("join group failed", data)
                })
            ;
        }

    })
;