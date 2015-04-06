'use strict';

angular.module('gamr')
  .controller('LoginRegisterCtrl',
  function LoginRegisterCtrl($scope, $rootScope, $location, djangoAuth, Validate) {

    $scope.model = {'username':'','password':''};
    $scope.login = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.login($scope.model.username, $scope.model.password)
        .then(function(data){
        	$location.path("/feed");
        },function(data){
        	$scope.errors = data;
        });
      }
    };

  	$scope.rmodel = {'username':'','password':'','email':''};
    $scope.register = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.register($scope.rmodel.username,$scope.rmodel.password1,$scope.rmodel.password2,$scope.rmodel.email)
        .then(function(data){
        	$scope.complete = true;
            $location.path('/');
        },function(data){
        	$scope.errors = data;
        });
      }
    };
  })
;
