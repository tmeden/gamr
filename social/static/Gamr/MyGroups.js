'use strict';
angular.module('gamr')

    .controller('MyGroupsCtrl',
    function MyGroupsCtrl($scope, $rootScope, API){

        $scope.group = {};
        $scope.groups = [];


        //var getGroups = function() {
        //    API.getUser()
        //        .then(function (data) {
        //            console.log("mygroups:", data);
        //            $scope.groups = data.results[0].groups;
        //        })
        //    ;
        //};
        //getGroups();

        API.fetchUser().then(function(data){
            $scope.groups = data.results[0].groups;
        });
        //console.log("user:", _user);

        $scope.createGroup = function(){
            console.log("createGroup called");
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