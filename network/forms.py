from django.forms import ModelForm
from .models import Post, Comment, Profile

# Create the form class.
class Inboxform(ModelForm):
     class Meta:
         model = Post
         fields = ['Inbox', 'Image']

class Commentform(ModelForm):
    class Meta:
        model = Comment
        fields = ['comment']

class Profileform(ModelForm):
    class Meta:
        model = Profile
        fields = ['Profile_pic']

class Editform(ModelForm):
    class Meta:
        model = Profile
        fields = ['Bio', 'Location']

