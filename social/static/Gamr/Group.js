'use strict';
angular.module('gamr')

    .controller('GroupCtrl',
    function GroupCtrl($scope, $rootScope, $routeParams, API){

        $scope.group = {};

        API.readGroup($routeParams.id).then(function(data){
            $scope.group = data;
        });

        $scope.createPost = function(){
            API.createPost({
                'text': $scope.newPostText,
                'group': $scope.group.pk,
                'owner': 1
            })
                .then(function (data){
                    $scope.group.posts.unshift(data);
                }, function (data){
                    console.log(data);
                })
            ;
        };

        $scope.createLike = function(postID){
            API.createLike(postID)
                .then(function (){
                    for (var i = 0; i < $scope.group.posts.length; i++){
                        if ($scope.group.posts[i].pk===postID){
                            $scope.group.posts[i].like_count++;
                        }
                    }
                })
            ;
        };


    })
;