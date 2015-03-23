from django.conf.urls import patterns, url, include
from social.api import views
from social.api.views import *


urlpatterns = patterns('',

    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^profile/make', MakeProfile.as_view()),

    url(r'^profile/(?P<pk>\d+)', RetrieveUpdateProfile.as_view()),

    # url(r'^users/me', MyProfile.as_view()),

    url(r'^users/(?P<pk>\d+)', RetrieveUser.as_view()),

    url(r'^users', ListUser.as_view()),

    url(r'^myinfo', RetrieveCurrentUser.as_view()),

    url(r'^groups/feed', GroupFeed.as_view()),

    url(r'^groups/join', CreateUserInGroup.as_view()),

    url(r'^groups/(?P<pk>\d+)', RetrieveUpdateDestroyGroup.as_view()),

    url(r'^groups', ListCreateGroup.as_view()),

    url(r'^posts/(?P<pk>\d+)', RetrieveUpdateDestroyPost.as_view()),

    url(r'^posts', ListCreatePost.as_view()),

    url(r'^comments/(?P<pk>\d+)', RetrieveUpdateDestroyComment.as_view()),

    url(r'^comments', CreateComment.as_view()),

    url(r'^like/(?P<pk>\d+)', DeleteLike.as_view()),

    url(r'^like', CreateLike.as_view()),

)
