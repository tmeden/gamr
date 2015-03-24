'use strict';
angular.module('gamr')

    .controller('CreateGroupCtrl',
    function CreateGroupCtrl($scope, $rootScope, GroupFactory){

        $scope.createGroup = function(){
            GroupFactory.create({
                'name': $scope.newGroupName,
                'description': $scope.newGroupDescription
            })
                .then(function (data){
                    console.log("success", data);
                }, function (data){
                    console.log(data);
                })
            ;
        };

    })
;