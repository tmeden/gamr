'use strict';
angular.module('gamr')

  .controller('UserCtrl',
  function UserCtrl($scope, $rootScope, $location, API) {

    $scope.user = false;

    API.fetchUser()
        .then(function(data){
            $scope.user = data.results[0].username;
            API.setUser(data.results[0]);
        })
    ;

    $rootScope.$on('djangoAuth.logged_in', function (){
        API.fetchUser()
            .then(function(data){
                $scope.user = data.results[0].username;
                API.setUser(data.results[0]);
            })
        ;
        $location.path('/feed');
    });

    $rootScope.$on('djangoAuth.logged_out', function (){
        $scope.user = false;
        $location.path('/');
    });

  })
;