from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Post(models.Model):
    users = models.ForeignKey(User, on_delete = models.CASCADE, related_name="users")
    Inbox = models.TextField(max_length=300)
    Image = models.ImageField(upload_to='images/', blank=True, null=True)
    Created = models.TimeField(auto_now_add=True)
    Updated = models.TimeField(auto_now=True)
    liked = models.ManyToManyField(User, null=True, related_name="like")

    def __str__(self):
        return f"({self.id}){self.users}'s inbox"

    def isliked(self, user):
        return user.like.filter(id=self.pk).exists()

    def count(self):
        return self.liked.count()


class Profile(models.Model):
    Users = models.OneToOneField(User, on_delete = models.CASCADE, related_name="userProfile")
    Followers = models.ManyToManyField(User, blank=True, null=True, related_name="followed")
    Follow = models.ManyToManyField(User, blank=True, null=True, related_name="follows")
    Profile_pic = models.ImageField(upload_to='images/', null=True, blank=True)

    def __str__(self):
        return f"{self.Users}'s following and followers"

    def isfollow(self, user):
        return user.followed.all()

class Comment(models.Model):
    comment_post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comment_post")
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.CharField(max_length=500)
    time = models.TimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.comment_post.users}'s post (id={self.comment_post.id})"




