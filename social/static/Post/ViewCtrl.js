'use strict';
angular.module('gamr')

    .controller('PostViewCtrl',
    function PostViewCtrl($scope, $rootScope, $routeParams, $location, API){

        $scope.post = {};

        var getPost = function(){
            API.readPost($routeParams.id)
                .then(function (data){
                    $scope.post = data;
                }, function (data){
                    console.log(data);
                })
            ;
        };
        getPost();


        $scope.updatePost = function(){
            API.updatePost($scope.post.text, $routeParams.id)
                .then(function (data){
                    $scope.post = data;
                    $scope.stopEditPost();
                }, function (data){
                    console.log(data);
                })
            ;
        };


        $scope.removePost = function(){
            API.removePost($routeParams.id)
                .then(function (data){
                    console.log('removePost successful');
                    $location.path('/');
                }, function (data){
                })
            ;
        };


        $scope.editing = false;

        $scope.editPost = function(){ $scope.editing = true; };
        $scope.stopEditPost = function(){ $scope.editing = false; };

        $scope.createComment = function(postID, comment){
            API.createComment(postID, comment)
                .then(function (data){
                    console.log("createComment success:",data);
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


        // user stuff copied from UserCtrl, should probably refactor somehow
        var updateUser = function() {
            API.getUser()
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