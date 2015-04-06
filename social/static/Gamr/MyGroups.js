'use strict';
angular.module('gamr')

    .controller('MyGroupsCtrl',
    function MyGroupsCtrl($scope, $rootScope, API){

        $scope.group = {};
        $scope.groups = [];

        API.fetchUser().then(function(data){
            $scope.groups = data.results[0].groups;
        });

        $scope.createGroup = function(){
            API.createGroup({
                'name': $scope.newGroupName,
                'description': $scope.newGroupDescription
            })
                .then(function(createGroupData){
                    API.joinGroup(createGroupData.pk)
                        .then(function(joinGroupData){
                            $scope.groups.unshift(createGroupData);
                        })
                    ;
                })
            ;
        };
    })
;