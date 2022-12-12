
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name='index'),
    path("login", views.login_view, name='login'),
    path("logout", views.logout_view, name='logout'),
    path("register", views.register, name='register'),
    path("likes/<int:like_id>", views.liked, name='liked'),
    path("profile/<int:user_id>", views.profile, name='profile'),
    path("profile/follow/<int:follow_id>", views.follow, name='follow'),
    path("edit/<int:edit_id>", views.edit, name='edit'),
    path("comment/<int:comment_id>", views.comment, name="comment"),
    path('following', views.following_post, name="following")
]
