'use strict';
angular.module('gamr')

  .factory('UserFactory', function UserFactory($q, $http){


    return {
        
      //getUser: function(){
      //  $http.get('/api/users/me')
      //    .success(function(data){
      //      this.setUser(data);
      //      return true;
      //    })
      //    .error(function(msg, code){
      //      return false;
      //    });
      //},
      //setUser: function(username){
      //  $rootScope.$broadcast('updateUser', username);
      //}

      getUser: function(){
        var deferred = $q.defer();
        $http.get('/api/myusername')
          .success(function(data, status, headers, config){
            deferred.resolve(data, status, headers, config);
          })
          .error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
        return deferred.promise;
      }

    };


  })
;