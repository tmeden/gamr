'use strict';
angular.module('gamr')

  .factory('PostFactory', function($q, $http){


    return {

      list: function(){
        var deferred = $q.defer();
        $http.get('/api/posts')
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(msg, code){
            deferred.reject(msg);
          });
        return deferred.promise;
      },

      create: function(postObj){
        var deferred = $q.defer();
        $http.post('/api/posts', postObj)
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(msg, code){
            deferred.reject(msg);
          });
        return deferred.promise;
      },

      read: function(pk){
        var deferred = $q.defer();
        $http.get('/api/posts/'+pk)
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(msg, code){
            deferred.reject(msg);
          });
        return deferred.promise;
      },

      update: function(text, pk){
        var deferred = $q.defer();
        $http.patch('/api/posts/'+pk, {'text': text})
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(msg, code){
            deferred.reject(msg);
          });
        return deferred.promise;
      },

      remove: function(pk){
        var deferred = $q.defer();
        $http.delete('/api/posts/'+pk)
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(msg, code){
            deferred.reject(msg);
          });
        return deferred.promise;
      },

      createComment: function(postID, comment){
        var deferred = $q.defer();
        $http.post('/api/comments', {
          'text': comment,
          'post': postID
        })
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(msg, code){
            deferred.reject(msg);
          });
        return deferred.promise;
      },

      removeComment: function(pk){
        var deferred = $q.defer();
        $http.delete('/api/comments/'+pk)
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(msg, code){
            deferred.reject(msg);
          });
        return deferred.promise;
      },

      createLike: function(postID){
        var deferred = $q.defer();
        $http.post('/api/like', {
          'post': postID
        })
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(msg, code){
            deferred.reject(msg);
          });
        return deferred.promise;
      },

      removeLike: function(pk){
        var deferred = $q.defer();
        $http.delete('/api/like/'+pk)
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(msg, code){
            deferred.reject(msg);
          });
        return deferred.promise;
      }

    }
  })
;