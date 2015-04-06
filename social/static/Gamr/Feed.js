'use strict';
angular.module('gamr')

    .controller('FeedCtrl',
    function FeedCtrl($scope, $rootScope, API){

        $scope.posts = [];

        API.getFeed().then(function(data){
            $scope.posts = data.results;
        });

        $scope.createLike = function(postID){
            API.createLike(postID)
                .then(function (){
                    for (var i = 0; i < $scope.posts.length; i++){
                        if ($scope.posts[i].pk===postID){
                            $scope.posts[i].like_count++;
                        }
                    }
                })
            ;
        };
    })
;