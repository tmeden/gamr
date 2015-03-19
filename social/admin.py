from django.contrib import admin
from social.models import *

admin.site.register(Post)
admin.site.register(Profile)
admin.site.register(Comment)
admin.site.register(Group)
admin.site.register(UserInGroup)
