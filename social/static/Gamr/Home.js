'use strict';
angular.module('gamr')

    .controller('HomeCtrl',
    function HomeCtrl($scope, $rootScope, $location, API){



        API.fetchUser().then(function(data){
            console.log("home ctrl fetch", data);
            if (data.results.length>0){
                $location.path('/feed');
            }else{
                $location.path('/login');
            }
        });
    })
;