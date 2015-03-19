from django.conf.urls import patterns, url
from social.api import views
from social.api.views import *


urlpatterns = patterns('',

    url(r'^users/me', views.MyProfile),

    url(r'^users/(?P<pk>\d+)', RetrieveUser.as_view()),

    url(r'^users', ListUser.as_view()),

    url(r'^myusername', RetrieveCurrentUser.as_view()),

    url(r'^groups/(?P<group_id>\d+)/join', CreateUserInGroup.as_view()),

    url(r'^groups/(?P<pk>\d+)', RetrieveUpdateDestroyGroup.as_view()),

    url(r'^groups', ListCreateGroup.as_view()),

    url(r'^posts/(?P<pk>\d+)', RetrieveUpdateDestroyPost.as_view()),

    url(r'^posts', ListCreatePost.as_view()),

    url(r'^comments/(?P<pk>\d+)', RetrieveUpdateDestroyComment.as_view()),

    url(r'^comments', CreateComment.as_view()),

    url(r'^feed', Feed.as_view()),

)