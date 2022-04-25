from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

# Data model for posts called Post 
class Post(models.Model):
    text = models.CharField(max_length=200)
    user = models.ForeignKey(User, default=None, on_delete=models.PROTECT)
    #created_by    = models.ForeignKey(User, on_delete=models.PROTECT, related_name="entry_creators")
    
    #updated_by    = models.ForeignKey(User, on_delete=models.PROTECT, related_name="entry_updators")
    #update_time   = models.DateTimeField()
    #title = models.CharField(max_length=200)
    #subtitle = models.CharField(max_length=200)
    #like_count = models.IntegerField(default=0)
    #[user] above = owner = models.ForeignKey(User, on_delete=models.PROTECT)
    creation_time = models.DateTimeField()
    #update_time = models.DateTimeField()


    def __str__(self):
        return 'id=' + str(self.id) + ',text="' + self.text + '"'

# Data model for the enhanced profile called Profile  
class Profile(models.Model):
    bio = models.CharField(max_length=200)
    
    #use one to one instead of foreign key for user 
    user = models.OneToOneField(User, on_delete=models.PROTECT)

    #picture
    picture = models.FileField(blank=True, default="profile.webp")
    picture1 = models.FileField(blank=True, default="1.webp")
    picture2 = models.FileField(blank=True, default="2.webp")
    picture3 = models.FileField(blank=True, default="3.webp")
    picture4 = models.FileField(blank=True, default="4.webp")
    picture5 = models.FileField(blank=True, default="5.webp")
    picture6 = models.FileField(blank=True, default="6.webp")
    picture7 = models.FileField(blank=True, default="7.webp")
    picture8 = models.FileField(blank=True, default="8.webp")
    picture9 = models.FileField(blank=True, default="9.webp")

    content_type = models.CharField(max_length=50)
    # follower / many to many 
    following = models.ManyToManyField(User, related_name="followers")

    def __str__(self):
        return 'id=' + str(self.id) + ',content type="' + self.content_type + '"'
    
""" # Data model for the enhanced profile called Profile  
class OtherProfile(models.Model):
    text = models.CharField(max_length=200)
    #use one to one instead of foreign key for user 
    user = models.ForeignKey(User, default=None, on_delete=models.PROTECT)

    #picture
    picture = models.FileField(blank=True)
    
    # follower / many to many 
    #follower = models.ManyToManyField(follower)

    def __str__(self):
        return 'id=' + str(self.id) + ',text="' + self.text + '"' """