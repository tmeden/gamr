from django.contrib.auth.models import User
from django.db import models


# User model

class Profile(models.Model):
    user = models.OneToOneField(
        User
    )
    # fb_id = models.CharField(max_length=20, unique=True)
    bio = models.TextField()

    # PROFILE_PRIVACY_SETTING_CHOICES = (
    #     ('O', 'Open'),
    #     ('F', 'Friends Only')
    # )
    # privacy_setting = models.CharField(
    #     max_length = 1,
    #     choices = PROFILE_PRIVACY_SETTING_CHOICES,
    #     default = 'O'
    # )
    def __unicode__(self):
        return self.user.username

    @property
    def username(self):
        return self.user.username

    # @property
    # def image_url(self):
    #     return "https://ivegotaproblemblog.files.wordpress.com/2012/07/386px-tux-g2-svg1.png"

    #email, first_name, gender, last_name, link

User.profile = property(lambda u: Profile.objects.get_or_create(user=u)[0])

# The pre-post stuph.

# Does UserInGroup (through field) work before Group?!?
# Would love to filer for admins



class Group(models.Model):
    owner = models.ForeignKey(User)
    name = models.CharField(max_length=80)
    description = models.TextField()
    members = models.ManyToManyField(
        User,
        through='UserInGroup',
        related_name = 'User.groups'
    )
    # GROUP_PRIVACY_SETTING_CHOICES = (
    #     ('O', 'Open'),
    #     ('C', 'Closed')
    # )
    # privacy_setting = models.CharField(
    #     max_length = 1,
    #     choices = GROUP_PRIVACY_SETTING_CHOICES,
    #     default = 'O'
    # )
    def __unicode__(self):
        return self.name


    @property
    def owner_username(self):
        return self.owner.username

    @property
    def member_count(self):
        return self.members.count()

    @property
    def post_count(self):
        return self.posts.count()

    # @property
    # def admins(self):
    #     return UserInGroup.objects.filter(role='A')


class UserInGroup(models.Model):
    joined = models.DateTimeField(auto_now_add=True)
    # USER_IN_GROUP_ROLE_CHOICES = (
    #     ('U', 'User'),
    #     ('A', 'Admin'),
    #     ('S', 'Superuser')
    # )
    # role = models.CharField(
    #     max_length = 1,
    #     choices = USER_IN_GROUP_ROLE_CHOICES,
    #     default = 'U'
    # )
    user = models.ForeignKey(User)
    group = models.ForeignKey(Group)


#
#
# class Event(models.Model):
#     owner = models.ForeignKey(User)
#     title = models.CharField(max_length=140)
#     text = models.TextField()
#     group = models.ForeignKey(Group)
#     datetime = models.DateTimeField()
#     location = models.CharField(max_length=80)
#     participants = models.ManyToManyField(
#         User,
#         through = 'AttendingEvent',
#         related_name = 'User.events'
#     )
#     EVENT_STATUS_CHOICES = (
#         ('D', 'Developing'),
#         ('S', 'Scheduled'),
#         ('H', 'Happening'),
#         ('F', 'Finished'),
#         ('P', 'Postponed'),
#         ('C', 'Cancelled')
#     )
#     status = models.CharField(
#         max_length = 1,
#         choices = EVENT_STATUS_CHOICES
#     )
#
#
# class AttendingEvent(models.Model):
#     ATTENDING_EVENT_STATUS_CHOICES = (
#         ('I', 'Invited'),
#         ('Y', 'Yes'),
#         ('N', 'No'),
#         ('M', 'Maybe')
#     )
#     status = models.CharField(
#         max_length = 1,
#         choices = ATTENDING_EVENT_STATUS_CHOICES
#     )
#     user = models.ForeignKey(User)
#     event = models.ForeignKey(Event)


# The posts

class Post(models.Model):
    owner = models.ForeignKey(User)
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    group = models.ForeignKey(Group, related_name='posts')

    def __unicode__(self):
        return self.text

    @property
    def owner_name(self):
        return self.owner.username

    @property
    def comment_count(self):
        return self.comments.count()

    @property
    def like_count(self):
        return self.likes.count()

    @property
    def owner_profile_image(self):
        return "https://ivegotaproblemblog.files.wordpress.com/2012/07/386px-tux-g2-svg1.png"

    @property
    def group_name(self):
        return self.group.name


    # group = models.ForeignKey(
    #     Group,
    #     null = True,
    #     blank = True
    # )
    # event = models.ForeignKey(
    #     Event,
    #     null = True,
    #     blank = True
    # )



# class UserPost(models.Model):
#     owner = models.ManyToOneRel(User)
#     text = models.TextField()
#
#
# class GroupPost(models.Model):
#     owner = models.ManyToOneRel(User)
#     text = models.TextField()
#     group = models.ForeignKey(Group)
#
#
# class EventPost(models.Model):
#     owner = models.ManyToOneRel(User)
#     text = models.TextField()
#     event = models.ForeignKey(Event)




# Comments happen. Basic shit.
# Owner is of the comment itself.
# *_owner is its parent's owner.


class Comment(models.Model):
    owner = models.ForeignKey(User)
    text = models.TextField()
    post = models.ForeignKey(Post, related_name='comments')

    def __unicode__(self):
        return self.text

    @property
    def owner_name(self):
        return self.owner.username


class Like(models.Model):
    owner = models.ForeignKey(User)
    post = models.ForeignKey(Post, related_name='likes')

# This is gonna be a whole 'nother piece of wtf?
# ManyToOneRel to itself?!?
# Serialize that!
# Protip: that's why you need the quotes

# class FriendshipRequest(models.Model):
#     requester = models.ForeignKey(User)
#     requestee = models.ForeignKey(User)
#     FRIENDSHIP_REQUEST_STATUS_CHOICES = (
#         ('I', 'Invited'),
#         ('Y', 'Yes'),
#         ('N', 'No'),
#         ('M', 'Maybe')
#     )
#     status = models.CharField()
#
#
# class Friendship(models.Model):
#     user = models.ForeignKey(User, unique=True)
#     friends = models.ManyToOneRel('Friendship')
#
#
