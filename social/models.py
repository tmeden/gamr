from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    owner = models.OneToOneField(User)
    bio = models.TextField(null=True, blank=True)
    picture = models.ImageField(null=True, blank=True)
    gender = models.CharField(max_length=40, null=True, blank=True)
    dob = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=60, null=True, blank=True)

    def __unicode__(self):
        return self.owner.username

    @property
    def username(self):
        return self.owner.username


User.profile = property(lambda u: Profile.objects.get_or_create(owner=u)[0])
User.groups = property(lambda u: Group.objects.filter(members=u))


class Group(models.Model):
    owner = models.ForeignKey(User)
    name = models.CharField(max_length=80)
    description = models.TextField()
    members = models.ManyToManyField(
        User,
        through='UserInGroup',
        related_name='User.groups'
    )

    def __unicode__(self):
        return self.name

    @property
    def owner_username(self):
        return self.owner.username

    @property
    def member_count(self):
        return self.members.count()


class UserInGroup(models.Model):
    joined = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User)
    group = models.ForeignKey(Group)

    class Meta:
        unique_together = ('owner', 'group')


class Post(models.Model):
    owner = models.ForeignKey(User)
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True, default='2015-03-14T09:26:53.589793Z')
    group = models.ForeignKey(Group, related_name='posts')

    class Meta:
        ordering = ['-timestamp']

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
        return self.owner.profile.picture

    @property
    def group_name(self):
        return self.group.name


class Comment(models.Model):
    owner = models.ForeignKey(User)
    text = models.TextField()
    post = models.ForeignKey(Post, related_name='comments')
    timestamp = models.DateTimeField(auto_now_add=True, default='2015-03-14T09:26:53.589793Z')

    class Meta:
        ordering = ['timestamp']

    def __unicode__(self):
        return self.text

    @property
    def owner_name(self):
        return self.owner.username

    @property
    def owner_profile_image(self):
        return self.owner.profile.picture


class Like(models.Model):
    owner = models.ForeignKey(User)
    post = models.ForeignKey(Post, related_name='likes')

    @property
    def owner_name(self):
        return self.owner.username

    def __unicode__(self):
        return "{user} {post}".format(user=self.owner.username, post=self.post)

    class Meta:
        unique_together = ('owner', 'post')

