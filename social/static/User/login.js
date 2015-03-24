'use strict';

angular.module('gamr')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, djangoAuth, Validate, UserFactory) {
    $scope.user = false;

    var updateUser = function() {
      UserFactory.getUser()
        .then(function (data, status, headers, config) {
          if (data) {
            $scope.user = data;
            $location.path('/feed');
          }
        })
      ;
      console.log($scope.user);
    };

    updateUser();

    $rootScope.$on('djangoAuth.logged_in', function (){
      $scope.user = updateUser();
    });

    $rootScope.$on('djangoAuth.logged_out', function (){
      $scope.user = false;
    });

    if ($scope.user){
      console.log('user exists!');
      $location.path('/feed');
    }

    $scope.model = {'username':'','password':''};
  	$scope.complete = false;
    $scope.login = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.login($scope.model.username, $scope.model.password)
        .then(function(data){
        	// success case
        	$location.path("/feed");
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      }
    }
  });
