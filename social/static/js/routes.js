'use strict';
angular.module('gamr')

  .config(function ($routeProvider, $locationProvider) {

    //$locationProvider.html5Mode(true);

    $routeProvider

      .when('/', {
        templateUrl: '/static/Gamr/_home.html',
        controller: 'HomeCtrl'
      })
      .when('/posts/:id', {
        templateUrl: '/static/Gamr/_post.html',
        controller: 'PostCtrl'
      })
      .when('/profile/:id', {
        templateUrl: '/static/Gamr/_profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/feed', {
        templateUrl: '/static/Gamr/_feed.html',
        controller: 'FeedCtrl'
      })
      .when('/groups/:id', {
        templateUrl: '/static/Gamr/_group.html',
        controller: 'GroupCtrl'
      })
      .when('/groups', {
        templateUrl: '/static/Gamr/_mygroups.html',
        controller: 'MyGroupsCtrl'
      })
      .when('/discover', {
        templateUrl: '/static/Gamr/_discover.html',
        controller: 'DiscoverCtrl'
      })

      .when('/register', {
        templateUrl: '/static/User/register.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/passwordReset', {
        templateUrl: '/static/User/passwordreset.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/passwordResetConfirm/:firstToken/:passwordResetToken', {
        templateUrl: '/static/User/passwordresetconfirm.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/login', {
        templateUrl: '/static/User/login.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/verifyEmail/:emailVerificationToken', {
        templateUrl: '/static/User/verifyemail.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/logout', {
        templateUrl: '/static/User/logout.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/userProfile', {
        templateUrl: '/static/User/userprofile.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/passwordChange', {
        templateUrl: '/static/User/passwordchange.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/restricted', {
        templateUrl: '/static/User/restricted.html',
        controller: 'RestrictedCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/authRequired', {
        templateUrl: '/static/User/authrequired.html',
        controller: 'AuthrequiredCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .otherwise({
        redirectTo: '/'
      })
    ;
  })
;