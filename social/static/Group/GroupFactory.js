'use strict';
angular.module('gamr')

    .factory('GroupFactory', function($q, $http){

        return {

            list: function(){
                var deferred = $q.defer();
                $http.get('/api/groups')
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(msg, code){
                        deferred.reject(msg);
                    })
                ;
                return deferred.promise;
            },

            search: function(searchTerm){
                var deferred = $q.defer();
                $http.get('/api/groups?search='+searchTerm)
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(msg, code){
                        deferred.reject(msg);
                    })
                ;
                return deferred.promise;
            },

            create: function(postObj){
                var deferred = $q.defer();
                $http.post('/api/groups', postObj)
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(msg, code){
                        deferred.reject(msg);
                    })
                ;
                return deferred.promise;
            },

            read: function(pk){
                var deferred = $q.defer();
                $http.get('/api/groups/'+pk)
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(msg, code){
                        deferred.reject(msg);
                    })
                ;
                return deferred.promise;
            },

            update: function(pk, data){
                var deferred = $q.defer();
                $http.patch('/api/groups/'+pk, data)
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(msg, code){
                        deferred.reject(msg);
                    })
                ;
                return deferred.promise;
            },

            remove: function(pk){
                var deferred = $q.defer();
                $http.delete('/api/groups/'+pk)
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(msg, code){
                        deferred.reject(msg);
                    })
                ;
                return deferred.promise;
            },

            join: function(pk){
                var deferred = $q.defer();
                $http.post('/api/groups/'+pk+'/join', {'group': pk})
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(msg, code){
                        deferred.reject(msg);
                    })
                ;
                return deferred.promise;
            }
        }
    })
;