from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls.static import static

from gamr import settings
from social.api.views import *


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'gamr.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin', include(admin.site.urls)),

    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^accounts/', include('allauth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^rest-auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),
    url(r'^rest-auth/', include('rest_auth.urls')),

    url(r'^api/', include('social.api.urls')),

    url(r'^$', 'social.views.index')


    # url(r'^users/(?P<user_pk>\d+)/posts/(?P<post_pk>\d+)', ),
    # url(r'^users/(?P<user_pk>\d+)', ),
    # url(r'^users/', ),

    # url(r'^groups/(?P<group_pk>\d+)/posts/(?P<post_pk>\d+)', ),
    # url(r'^groups/(?P<group_pk>\d+)/edit', UpdateGroup.as_view()),
    # url(r'^groups/(?P<group_pk>\d+)/delete', DestroyGroup.as_view()),
    # url(r'^groups/(?P<group_pk>\d+)', ViewGroup.as_view()),
    # url(r'^groups/add', CreateGroup.as_view()),
    # url(r'^groups', ListGroup.as_view()),

    # url(r'^events/(?P<event_pk>\d+)/posts/(?P<post_pk>\d+)', ),
    # url(r'^events/(?P<event_pk>\d+)/edit', UpdateGroup.as_view()),
    # url(r'^events/(?P<event_pk>\d+)/delete', DestroyGroup.as_view()),
    # url(r'^events/(?P<event_pk>\d+)', ViewEvent.as_view()),
    # url(r'^events', ListCreateEvent.as_view()),

)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)