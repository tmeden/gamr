'use strict';
angular.module('gamr')

    .factory('API', function API($q, $http, $location){

        var api = '/api/';

        var user = {};

        return {

            getUser: function(){
                return user;
            },

            setUser: function(userObj){
                user = userObj;
                console.log("setUser:", userObj);
            },

            fetchUser: function(){
                var deferred = $q.defer();
                $http.get(api+'myinfo')
                  .success(function(data){
                    deferred.resolve(data);
                  })
                  .error(function(data){
                    deferred.reject(data);
                  });
                return deferred.promise;
            },

            readProfile: function(pk){
                var deferred = $q.defer();
                $http.get(api+'users/'+pk)
                  .success(function(data){
                    deferred.resolve(data);
                  })
                  .error(function(msg, code){
                    deferred.reject(msg);
                  });
                return deferred.promise;
            },

            updateProfile: function(data, pk){
                var deferred = $q.defer();
                $http.patch(api+'users/'+pk, data)
                  .success(function(data){
                    deferred.resolve(data);
                  })
                  .error(function(msg, code){
                    deferred.reject(msg);
                  });
                return deferred.promise;
            },

            listGroup: function(){
                var deferred = $q.defer();
                $http.get(api+'groups')
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(msg, code){
                        deferred.reject(msg);
                    })
                ;
                return deferred.promise;
            },

            searchGroup: function(searchTerm){
                var deferred = $q.defer();
                $http.get(api+'groups?search='+searchTerm)
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(msg, code){
                        deferred.reject(msg);
                    })
                ;
                return deferred.promise;
            },

            createGroup: function(postObj){
                var deferred = $q.defer();
                $http.post(api+'groups', postObj)
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(msg, code){
                        deferred.reject(msg);
                    })
                ;
                return deferred.promise;
            },

            readGroup: function(pk){
                var deferred = $q.defer();
                $http.get(api+'groups/'+pk)
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(msg, code){
                        deferred.reject(msg);
                    })
                ;
                return deferred.promise;
            },

            joinGroup: function(pk){
                var deferred = $q.defer();
                var _user = this.getUser();
                console.log("_user:", _user);
                $http.post(api+'groups/join', {'group': pk, 'owner': _user.pk})
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(msg, code){
                        deferred.reject(msg);
                    })
                ;
                return deferred.promise;
            },

            createPost: function(postObj){
                var deferred = $q.defer();
                $http.post(api+'posts', postObj)
                  .success(function(data){
                    deferred.resolve(data);
                  })
                  .error(function(msg, code){
                    deferred.reject(msg);
                  });
                return deferred.promise;
            },

            readPost: function(pk){
                var deferred = $q.defer();
                $http.get(api+'posts/'+pk)
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
                $http.post(api+'comments', {
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
                $http.delete(api+'comments/'+pk)
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
                $http.post(api+'like', {
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

            getFeed: function(){
                var deferred = $q.defer();
                $http.get(api+'groups/feed')
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(msg){
                        deferred.reject(msg);
                    });
                return deferred.promise;
            }

        };
    })
;