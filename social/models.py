from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(User)
    bio = models.TextField()
    picture = models.ImageField(null=True, blank=True)

    def __unicode__(self):
        return self.user.username

    @property
    def username(self):
        return self.user.username


User.profile = property(lambda u: Profile.objects.get_or_create(user=u)[0])
User.groups = property(lambda u: Group.objects.filter(members=u))

class Group(models.Model):
    owner = models.ForeignKey(User)
    name = models.CharField(max_length=80)
    description = models.TextField()
    members = models.ManyToManyField(
        User,
        through='UserInGroup',
        related_name = 'User.groups'
    )

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


class UserInGroup(models.Model):
    joined = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User)
    group = models.ForeignKey(Group)
    class Meta:
        unique_together = ('user', 'group')

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
        return self.owner.profile.picture
    @property
    def group_name(self):
        return self.group.name


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

    @property
    def owner_name(self):
        return self.owner.username
    def __unicode__(self):
        return "{user} {post}".format(user=self.owner.username, post=self.post)
    class Meta:
        unique_together = ('owner', 'post')