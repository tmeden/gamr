'use strict';
var gamr = angular.module('gamr', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
])

    .config(function($httpProvider){
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    })

    .config(function($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    })
    .run(function(djangoAuth){
        djangoAuth.initialize('//127.0.0.1:8000/rest-auth', false);
    });
    //.run(function($location, API){
    //    console.log('run function called');
    //    API.startup();
    //})

;