from django.http import HttpResponse
from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLogin
from social.permissions import IsOwnerOrReadOnly
from social.api.serializers import *


class FacebookLogin(SocialLogin):
    adapter_class = FacebookOAuth2Adapter


class RetrieveCurrentUser(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get(self, request):
        data = User.objects.filter(username=self.request.user)
        return HttpResponse(data)


class RetrieveUser(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserWithGroupsSerializer


class ListUser(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserWithGroupsSerializer


class MakeProfile(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)


class RetrieveUpdateProfile(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class ListCreatePost(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = ListPostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)


class RetrieveUpdateDestroyPost(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = ViewPostSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class CreateComment(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CreateCommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)


class RetrieveUpdateDestroyComment(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class CreateLike(generics.CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = CreateLikeSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)


class DeleteLike(generics.DestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class ListCreateGroup(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = ListGroupSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'description')

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)


class RetrieveUpdateDestroyGroup(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = ViewGroupSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class CreateUserInGroup(generics.CreateAPIView):
    queryset = UserInGroup.objects.all()
    serializer_class = UserInGroupSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)


class GroupFeed(generics.ListAPIView):
    serializer_class = ListPostSerializer

    def get_queryset(self):
        user = self.request.user
        posts = Post.objects.filter(group__members = user)
        return posts
