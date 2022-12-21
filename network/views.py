import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from .forms import Inboxform, Commentform, Profileform, Editform
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt


from django.core.paginator import Paginator

from .models import User, Post, Profile, Comment

@csrf_exempt
def index(request):

    user = User.objects.get(id=request.user.id)
    users = User.objects.all()
    form = Inboxform()
    post = Post.objects.all()
    posts = reversed(list(post))
    check = user.like.all()

    #Set up Pagination
    p = Paginator(Post.objects.all(), 30)
    page = request.GET.get('page')
    Posts = p.get_page(page)
    nums = "a" * Posts.paginator.num_pages
    
    # comments about post
    commentform = Commentform()
    # comment = Comment.objects.filter(comment_post=instance.id)

    if request.method == "POST":
        form = Inboxform(request.POST, request.FILES)
        if form.is_valid():
            instance = form.save(commit=False)
            instance.users = request.user
            instance.save()
            return HttpResponseRedirect(reverse("index"))
            form = Inboxform()

    


    return render(request, "network/index.html", {
        'form': form,
        'forms': commentform,
        'inbox': posts,
        'check': check,
        'Posts': Posts,
        "nums": nums,
        "comment": comment,
        "users": users
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        profile = Profile(Users=user)
        profile.save()
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


@csrf_exempt
def liked(request, like_id):
    # user = request.user
    # post = Post.objects.get(pk=like_id)
    # # if post.liked.filter(id=request.user.id):
    # if post.isliked(user):
    #     post.liked.remove(request.user)
    # else:
    #     post.liked.add(request.user)
    # return HttpResponseRedirect(reverse('index'))

    user = request.user

    try:
        post = Post.objects.get(pk=like_id)
    except Post.DoesNotExist:
        return JsonResponse({"error": "Post does not exist"}, status=404)

    # if post.liked.filter(id=request.user.id):
    if post.isliked(user):
        post.liked.remove(request.user)
        islike = False
    else:
        post.liked.add(request.user)
        islike = True

    count = post.count()

    # return HttpResponseRedirect(reverse('index'))
    # instead of HttpResponseRedirect, we can use JsonResponse

    return JsonResponse({'islike': islike, 'count': count}, status=200)




def unlike(request, like_id):
    pass

def profile(request, user_id):
    mainuser = User.objects.get(id=request.user.id)
    user = User.objects.get(id=user_id)
    post = Post.objects.filter(users=user)
    profile = Profile.objects.get(id=user_id - 1)

    # check if user exists
    check = mainuser.followed.filter(Users=user).exists()

    # checll how many number of following and followers
    followersCount = user.follows.all().count()
    followingCount = user.followed.all().count()
    

    # forms
    form = Inboxform()
    forms = Editform(instance=profile)
    commentform = Commentform()
    


    if request.method == "POST":
        if len(request.FILES) != 0:
            profile.Profile_pic = request.FILES['image_file']
            profile.save()
        
    return render(request, "network/profile.html", {
        "posts": post,
        "user": user,
        "profile": profile,
        "check": check,
        "form": form,
        "forms": commentform,
        "editforms": forms,

        
    })
    

def profileBackground(request, profile_id):
    profile = Profile.objects.get(id=profile_id - 1)

    if request.method == "POST":
        if len(request.FILES) != 0:
            profile.Background_pic = request.FILES['backgroundImage_file']
            profile.save()

        return HttpResponseRedirect(reverse('profile', args=[profile_id]))

def profileEdit(request, edit_id):
    profile = Profile.objects.get(id=edit_id - 1)

    if request.method == "POST":
        form = Editform(request.POST)
        if form.is_valid():
            # instance = form.save(commit=False)
            # instance.Users = profile.Users
            profile.Bio = request.POST["Bio"]
            profile.Location = request.POST["Location"]
            profile.Born = request.POST["Born"]
            profile.Status = request.POST["Status"]
            profile.Occupation = request.POST["Occupation"]
            profile.save()
            return HttpResponseRedirect(reverse('profile', args=[edit_id]))


@csrf_exempt
def follow(request, follow_id):
    user = User.objects.get(id=request.user.id)
    following_user = User.objects.get(id=follow_id)
    profile = Profile.objects.get(Users=following_user)
    profile2 = Profile.objects.get(Users=user)

    if request.method == "POST":

        followersCount = following_user.follows.all().count()
        followingCount = following_user.followed.all().count()

        check = user.followed.filter(Users=following_user).exists()

        if check:
            profile.Followers.remove(user)
            profile2.Follow.remove(following_user)
        else:
            profile.Followers.add(user)
            profile2.Follow.add(following_user)
    
        return JsonResponse({'check': check, 'followersC': followersCount, 'followingC': followingCount, 'successful': "successful"}, status=200)
    # return HttpResponseRedirect(reverse('profile', args=[follow_id]))

def unfollow(request, follow_id):
    pass

@csrf_exempt
def edit(request, edit_id):
     # Query for requested email
    try:
        edit = Post.objects.get(pk=edit_id)
    except Post.DoesNotExist:
        return JsonResponse({"error": "Post not found."}, status=404)


    # return JsonResponse({"inbox":f"this is the {inbox}"}, status=200)

    # print(data)
    if request.method == "POST":

        data = json.loads(request.body)
        inbox = data['body']

        edit.Inbox = inbox
        edit.save()

        return JsonResponse({'inbox': inbox, 'success': "successful"}, status=200)

@csrf_exempt
def comment(request, comment_id):

    try:
        post = Post.objects.get(pk=comment_id)
    except Post.DoesNotExist:
        return JsonResponse({"error": "comment not found."}, status=404)

    if request.method == "POST":

        data = json.loads(request.body)
        value = data['body']

        user = User.objects.get(id=request.user.id)
        comment = Comment(comment_post=post, username=request.user, comment=value)
        comment.save()
        
        try:
            Image = user.userProfile.Profile_pic.url
        except:
            Image = "https://social.webestica.com/assets/images/avatar/placeholder.jpg"

        return JsonResponse({'user': str(user), 'image': Image, 'comment': value, 'success': "successful"}, status=200)

def following_post(request):
    user = User.objects.get(id=request.user.id)
    following = user.followed.all()
    post = Post.objects.all()
    commentform = Commentform()


    for follow in following:
        following_post = Post.objects.filter(users=follow.Users)
        

    return render(request, "network/following.html", {
        "following": following_post,
        "forms": commentform
    })




