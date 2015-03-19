from rest_framework import serializers
from social.models import *


# Basic stuph.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username', 'image_url')


class ProfileSerializer(serializers.ModelSerializer):
    # owner = UserSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = ('pk', 'username', 'bio')


class ListPostSerializer(serializers.ModelSerializer):
    # owner = UserSerializer(read_only=True)
    # group = GroupSerializer(read_only=True, allow_null=True)
    # comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = (
            'pk',
            'owner',
            'owner_name',
            'owner_profile_image',
            'text',
            'timestamp',
            'comment_count',
            'like_count',
            'group',
            'group_name'
        )


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('pk', 'owner_name', 'text', 'post')


class ViewPostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = (
            'pk',
            'owner',
            'owner_name',
            'owner_profile_image',
            'text',
            'timestamp',
            'group',
            'group_name',
            'comments',
            'likes',
            'comments',
            'likes'
        )


class ViewGroupSerializer(serializers.ModelSerializer):
    posts = ListPostSerializer(many=True, read_only=True)
    class Meta:
        model = Group
        fields = ('pk', 'name', 'owner', 'description', 'posts')


class ListGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('pk', 'name', 'owner', 'description', 'post_count')


# class AddGroupSerializer(serializers.ModelSerializer):
# class Meta:
#         model = Group
#         fields = ('name', 'description')


# Posts happen.
# class PostSpecificSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = ('pk', 'owner_name', 'text', 'timestamp', 'comment_count', 'like_count', 'owner_profile_image')
#
#
# class GroupWithPostsSerializer(serializers.ModelSerializer):
#     users = UserSerializer(many=True, read_only=True)
#     posts = PostSpecificSerializer(many=True, read_only=True)
#
#     class Meta:
#         model = Group
#         fields = ('pk', 'name', 'owner', 'description', 'users', 'posts')

        # class GroupPostSerializer(serializers.ModelSerializer):
        #     owner = UserSerializer(read_only=True)
        #     group = GroupSerializer(read_only=True)
        #     class Meta:
        #         model = GroupPost
        #         fields = ('pk', 'text', 'owner', 'group')


        # class EventSerializer(serializers.ModelSerializer):
        #     owner = UserSerializer(read_only=True)
        #     group = GroupSerializer(read_only=True)
        #     participants = UserSerializer(many=True, read_only=True)
        #     class Meta:
        #         model = Event
        #         fields = ('pk', 'title', 'text', 'datetime', 'location', 'owner', 'group', 'participants')


        # Setup bigger things.


        # class UserPostCommentSerializer(serializers.ModelSerializer):
        #     class Meta:
        #         model = UserPostComment
        #         fields = ('pk', 'owner', 'text')
        #
        #
        # class GroupPostCommentSerializer(serializers.ModelSerializer):
        #     class Meta:
        #         model = GroupPostComment
        #         fields = ('pk', 'owner', 'text')
        #
        #
        # class EventPostCommentSerializer(serializers.ModelSerializer):
        #     class Meta:
        #         model = EventPostComment
        #         fields = ('pk', 'owner', 'text')


        # Here's where we break the whole "RESTful" thing
        # Why not?
        # Because multiple queries are worst than "combined?" queries.
        # class UserPostWithCommentsSerializer(serializers.Serializer):
        #     user_post = UserPostSerializer(read_only=True)
        #     comments = UserPostCommentSerializer(many=True, read_only=True)
        #     class Meta:
        #         fields = ('user_post', 'comments')
        #
        #
        # class GroupPostWithCommentsSerializer(serializers.Serializer):
        #     group_post = GroupPostSerializer(read_only=True)
        #     comments = GroupPostCommentSerializer(many=True, read_only=True)
        #     class Meta:
        #         fields = ('group_post', 'comments')
        #
        #
        # class EventPostWithCommentsSerializer(serializers.Serializer):
        #     event_post = EventPostSerializer(read_only=True)
        #     comments = EventPostCommentSerializer(many=True, read_only=True)
        #     class Meta:
        #         fields = ('event_post', 'comments')
        #

        # How are we gonna serialize this UserM2MUser stuph?
        # class FriendshipRequestSerializer(serializers.ModelSerializer):
        #     class Meta:
        #         model = FriendshipRequest
        #         fields = ('pk', 'requester', 'requestee', 'status')
        #
        #
        # class FriendshipSerializer(serializers.ModelSerializer):
        #     class Meta:
        #         model = Friendship
        #         fields = ('pk', 'user', 'friends')