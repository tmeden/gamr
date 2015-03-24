'use strict';
angular.module('gamr')

    .controller('FeedCtrl',
    function FeedCtrl($scope, $rootScope, API){

        $scope.post = {};
        $scope.posts = [];

        var listPosts = function() {
            API.listPosts()
                .then(function (data) {
                    $scope.posts = data.results;
                })
            ;
        };
        listPosts();


        $scope.createPost = function(){
            API.createPost({'text': $scope.newPostText})
                .then(function (data){
                    $scope.posts.push(data);
                }, function (data){
                    console.log(data);
                })
            ;
        };


        $scope.createComment = function(postID, comment){
            API.createComment(postID, comment)
                .then(function (data){
                    console.log("createComment success:",data);
                    for (var i = 0; i < $scope.posts.length; i++){
                        if ($scope.posts[i].pk===postID){
                            $scope.posts[i].comments.push(data);
                        }
                    }
                })
            ;
        };


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


        $scope.removeComment = function(commentID){
            API.removeComment(commentID)
                .then(function (data){
                    for (var i = 0; i<$scope.posts.length; i++){
                        for (var j = 0; j<$scope.posts[i].comments.length; j++){
                            if ($scope.posts[i].comments[j].pk===commentID){
                                $scope.posts[i].comments.splice([j],1);
                            }
                        }
                    }
                })
            ;
        };





        // user stuff copied from UserCtrl, should probably refactor somehow
        var updateUser = function() {
            UserFactory.getUser()
                .then(function (data) {
                    if (data) {
                        $scope.user = data;
                    }
                })
            ;
        };

        $rootScope.$on('djangoAuth.logged_in', function (){
            $scope.user = updateUser();
        });

        $rootScope.$on('djangoAuth.logged_out', function (){
            $scope.user = false;
        });
    })
;