'use strict';
angular.module('gamr')

    .controller('PostCtrl',
    function PostCtrl($scope, $rootScope, $routeParams, $location, API){

        $scope.post = {};
        $scope.username = "";
        API.fetchUser().then(function(data){
            $scope.username = data.results[0].username;
        });

        API.readPost($routeParams.id)
            .then(function (data){
                $scope.post = data;
            }, function (data){
                console.log(data);
            })
        ;


        $scope.createComment = function(postID, comment){
            API.createComment(postID, comment)
                .then(function (data){
                    $scope.post.comments.push(data);
                })
            ;
        };


        $scope.removeComment = function(commentID){
            API.removeComment(commentID)
                .then(function (data){
                    for (var j = 0; j<$scope.post.comments.length; j++){
                        if ($scope.post.comments[j].pk===commentID){
                            $scope.post.comments.splice([j],1);
                        }
                    }
                })
            ;
        };


    })
;