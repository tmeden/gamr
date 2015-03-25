'use strict';
angular.module('gamr')

    .factory('API', function API($q, $http, $location){

        var api = '/api/';

        var user = {};

        return {

            getUser: function(){
                return user;
            },

            getUsername: function(){
                return user.username;
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

            myProfile: function(){
                var deferred = $q.defer();
                $http.get(api+'myinfo')
                  .success(function(data){
                    deferred.resolve(data);
                  })
                  .error(function(msg, code){
                    deferred.reject(msg);
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

            updateGroup: function(pk, data){
                var deferred = $q.defer();
                $http.patch(api+'groups/'+pk, data)
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(msg, code){
                        deferred.reject(msg);
                    })
                ;
                return deferred.promise;
            },

            removeGroup: function(pk){
                var deferred = $q.defer();
                $http.delete(api+'groups/'+pk)
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

            listPosts: function(){
                var deferred = $q.defer();
                $http.get(api+'posts')
                  .success(function(data){
                    deferred.resolve(data);
                  })
                  .error(function(msg, code){
                    deferred.reject(msg);
                  });
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

            updatePost: function(text, pk){
                var deferred = $q.defer();
                $http.patch(api+'posts/'+pk, {'text': text})
                  .success(function(data){
                    deferred.resolve(data);
                  })
                  .error(function(msg, code){
                    deferred.reject(msg);
                  });
                return deferred.promise;
            },

            removePost: function(pk){
                var deferred = $q.defer();
                $http.delete(api+'posts/'+pk)
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

            removeLike: function(pk){
                var deferred = $q.defer();
                $http.delete(api+'like/'+pk)
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

            //startup: function(){
            //    console.log('this before this.fetchUser', this);
            //    var _this = this;
            //    _this.fetchUser().then(function(data){
            //        console.log("run getchUser data: ", data);
            //        if (data.results[0].username){
            //            console.log("we see data.res.urname!!1!", data);
            //            _this.setUser(data.results[0]);
            //            _this.myProfile().then(function(data){
            //                if (data.results[0].groups.length>0){
            //                    //console.log("take me to your feeder!", data);
            //                    $location.path('/feed');
            //                }else{
            //                    //console.log("make it discover");
            //                    $location.path('/discover');
            //                }
            //            });
            //        }else{
            //            console.log("[] is false");
            //            $location.path('/login');
            //        }
            //        return data.results[0];
            //    });
            //}
        };
    })
;