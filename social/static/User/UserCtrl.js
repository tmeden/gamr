'use strict';
angular.module('gamr')

  .controller('UserCtrl',
  function UserCtrl($scope, $rootScope, $location, API) {

    var userObj = API.fetchUser()
        .then(function(data){
            $scope.user = data.results[0].username;
            API.setUser(data.results[0]);
        })
    ;

    console.log('UserCtrl:', $scope.user);

    $rootScope.$on('djangoAuth.logged_in', function (){
      API.startup();
      $scope.user = API.getUsername();
    });

    $rootScope.$on('djangoAuth.logged_out', function (){
      API.startup();
      $scope.user = API.getUsername();
    });

  })
;