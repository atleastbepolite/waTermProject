from django import forms

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from socialnetwork.models import Post, Profile

MAX_UPLOAD_SIZE = 2500000 

class LoginForm(forms.Form):
    username = forms.CharField(max_length = 20, widget= forms.TextInput
                           (attrs={'id':'id_username'})) 
    password = forms.CharField(max_length = 200, widget = forms.PasswordInput(attrs={'id':'id_password'}))

    # Customizes form validation for properties that apply to more
    # than one field.  Overrides the forms.Form.clean function.
    def clean(self):
        # Calls our parent (forms.Form) .clean function, gets a dictionary
        # of cleaned data as a result
        cleaned_data = super().clean()

        # Confirms that the two password fields match
        username = cleaned_data.get('username')
        password = cleaned_data.get('password')
        user = authenticate(username=username, password=password)
        if not user:
            raise forms.ValidationError("Invalid username/password")

        # We must return the cleaned data we got from our parent.
        return cleaned_data


class RegisterForm(forms.Form):
    username   = forms.CharField(max_length = 20, widget= forms.TextInput
                           (attrs={'id':'id_username'}))
    password1  = forms.CharField(max_length = 200, 
                                 label='Password', 
                                 widget = forms.PasswordInput(attrs={'id':'id_password'}))
    password2  = forms.CharField(max_length = 200, 
                                 label='Confirm',  
                                 widget = forms.PasswordInput(attrs={'id':'id_confirm_password'}))
    email      = forms.CharField(max_length=50, label='E-mail',
                                 widget = forms.EmailInput(attrs={'id':'id_email'}))
    first_name = forms.CharField(max_length=20, widget= forms.TextInput
                           (attrs={'id':'id_first_name'}))
    last_name  = forms.CharField(max_length=20, widget= forms.TextInput
                           (attrs={'id':'id_last_name'}))
    
    
    

    # Customizes form validation for properties that apply to more
    # than one field.  Overrides the forms.Form.clean function.
    def clean(self):
        # Calls our parent (forms.Form) .clean function, gets a dictionary
        # of cleaned data as a result
        cleaned_data = super().clean()

        # Confirms that the two password fields match
        password1 = cleaned_data.get('password1')
        password2 = cleaned_data.get('password2')
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords did not match.")

        # We must return the cleaned data we got from our parent.
        return cleaned_data

    # Customizes form validation for the username field.
    def clean_username(self):
        # Confirms that the username is not already present in the
        # User model database.
        username = self.cleaned_data.get('username')
        if User.objects.filter(username__exact=username):
            raise forms.ValidationError("Username is already taken.")

        # We must return the cleaned data we got from the cleaned_data
        # dictionary
        return username

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ('text',)
        widgets = {
            'text' : forms.Textarea(attrs={'rows':'3'}),
        }

    """ widgets = {'text': forms.Textarea(attrs={'rows': 4,
        'class': "input-group input-group-lg text-center"})} """

class ProfileForm(forms.ModelForm):
    profile_picture = forms.BooleanField(widget=forms.HiddenInput, initial=True)
    class Meta:
        model = Profile
        fields = ( 'bio', 'picture', )
        widgets = {
            'bio' : forms.Textarea(attrs={'id':'id_bio_input_text', 'rows':'3'}),
            'picture' : forms.FileInput(attrs={'id':'id_profile_picture'})
        }

        labels = {
            'bio' : "Mood",
            'picture' : "Profile"
        }

    def clean_picture(self):
        picture = self.cleaned_data['picture']
        if not picture or not hasattr(picture, 'content_type'):
            raise forms.ValidationError('You must upload a picture')
        if not picture.content_type or not picture.content_type.startswith('image'):
            raise forms.ValidationError('File type is not image')
        if picture.size > MAX_UPLOAD_SIZE:
            raise forms.ValidationError('File too big (max size is {0} bytes)'.format(MAX_UPLOAD_SIZE))
        return 

class ProfilePicture1Form(forms.ModelForm):
    other_picture1 = forms.BooleanField(widget=forms.HiddenInput, initial=True)
    class Meta:
        model = Profile
        fields = ('picture1',)
        widgets = {
            'picture1' : forms.FileInput(attrs={'id':'id_profile_picture1'})
        }

        labels = {
            'picture1' : "#1"
        }

    def clean_picture(self):
        picture = self.cleaned_data['picture1']
        if not picture or not hasattr(picture, 'content_type'):
            raise forms.ValidationError('You must upload a picture')
        if not picture.content_type or not picture.content_type.startswith('image'):
            raise forms.ValidationError('File type is not image')
        if picture.size > MAX_UPLOAD_SIZE:
            raise forms.ValidationError('File too big (max size is {0} bytes)'.format(MAX_UPLOAD_SIZE))
        return 

class ProfilePicture2Form(forms.ModelForm):
    other_picture2 = forms.BooleanField(widget=forms.HiddenInput, initial=True)
    class Meta:
        model = Profile
        fields = ('picture2',)
        widgets = {
            'picture2' : forms.FileInput(attrs={'id':'id_profile_picture2'})
        }
        labels = {
            'picture2' : "#2"
        }

    def clean_picture(self):
        picture = self.cleaned_data['picture2']
        if not picture or not hasattr(picture, 'content_type'):
            raise forms.ValidationError('You must upload a picture')
        if not picture.content_type or not picture.content_type.startswith('image'):
            raise forms.ValidationError('File type is not image')
        if picture.size > MAX_UPLOAD_SIZE:
            raise forms.ValidationError('File too big (max size is {0} bytes)'.format(MAX_UPLOAD_SIZE))
        return 

class ProfilePicture3Form(forms.ModelForm):
    other_picture3 = forms.BooleanField(widget=forms.HiddenInput, initial=True)
    class Meta:
        model = Profile
        fields = ('picture3',)
        widgets = {
            'picture3' : forms.FileInput(attrs={'id':'id_profile_picture3'})
        }
        labels = {
            'picture3' : "#3"
        }

    def clean_picture(self):
        picture = self.cleaned_data['picture3']
        if not picture or not hasattr(picture, 'content_type'):
            raise forms.ValidationError('You must upload a picture')
        if not picture.content_type or not picture.content_type.startswith('image'):
            raise forms.ValidationError('File type is not image')
        if picture.size > MAX_UPLOAD_SIZE:
            raise forms.ValidationError('File too big (max size is {0} bytes)'.format(MAX_UPLOAD_SIZE))
        return 

class ProfilePicture4Form(forms.ModelForm):
    other_picture4 = forms.BooleanField(widget=forms.HiddenInput, initial=True)
    class Meta:
        model = Profile
        fields = ('picture4',)
        widgets = {
            'picture4' : forms.FileInput(attrs={'id':'id_profile_picture4'})
        }
        labels = {
            'picture4' : "#4"
        }

    def clean_picture(self):
        picture = self.cleaned_data['picture4']
        if not picture or not hasattr(picture, 'content_type'):
            raise forms.ValidationError('You must upload a picture')
        if not picture.content_type or not picture.content_type.startswith('image'):
            raise forms.ValidationError('File type is not image')
        if picture.size > MAX_UPLOAD_SIZE:
            raise forms.ValidationError('File too big (max size is {0} bytes)'.format(MAX_UPLOAD_SIZE))
        return 

class ProfilePicture5Form(forms.ModelForm):
    other_picture5 = forms.BooleanField(widget=forms.HiddenInput, initial=True)
    class Meta:
        model = Profile
        fields = ('picture5',)
        widgets = {
            'picture5' : forms.FileInput(attrs={'id':'id_profile_picture5'})
        }
        labels = {
            'picture5' : "#5"
        }

    def clean_picture(self):
        picture = self.cleaned_data['picture5']
        if not picture or not hasattr(picture, 'content_type'):
            raise forms.ValidationError('You must upload a picture')
        if not picture.content_type or not picture.content_type.startswith('image'):
            raise forms.ValidationError('File type is not image')
        if picture.size > MAX_UPLOAD_SIZE:
            raise forms.ValidationError('File too big (max size is {0} bytes)'.format(MAX_UPLOAD_SIZE))
        return 

class ProfilePicture6Form(forms.ModelForm):
    other_picture6 = forms.BooleanField(widget=forms.HiddenInput, initial=True)
    class Meta:
        model = Profile
        fields = ('picture6',)
        widgets = {
            'picture6' : forms.FileInput(attrs={'id':'id_profile_picture6'})
        }
        labels = {
            'picture6' : "#6"
        }

    def clean_picture(self):
        picture = self.cleaned_data['picture6']
        if not picture or not hasattr(picture, 'content_type'):
            raise forms.ValidationError('You must upload a picture')
        if not picture.content_type or not picture.content_type.startswith('image'):
            raise forms.ValidationError('File type is not image')
        if picture.size > MAX_UPLOAD_SIZE:
            raise forms.ValidationError('File too big (max size is {0} bytes)'.format(MAX_UPLOAD_SIZE))
        return 

class ProfilePicture7Form(forms.ModelForm):
    other_picture7 = forms.BooleanField(widget=forms.HiddenInput, initial=True)
    class Meta:
        model = Profile
        fields = ('picture7',)
        widgets = {
            'picture7' : forms.FileInput(attrs={'id':'id_profile_picture7'})
        }
        labels = {
            'picture7' : "#7"
        }

    def clean_picture(self):
        picture = self.cleaned_data['picture7']
        if not picture or not hasattr(picture, 'content_type'):
            raise forms.ValidationError('You must upload a picture')
        if not picture.content_type or not picture.content_type.startswith('image'):
            raise forms.ValidationError('File type is not image')
        if picture.size > MAX_UPLOAD_SIZE:
            raise forms.ValidationError('File too big (max size is {0} bytes)'.format(MAX_UPLOAD_SIZE))
        return 

class ProfilePicture8Form(forms.ModelForm):
    other_picture8 = forms.BooleanField(widget=forms.HiddenInput, initial=True)
    class Meta:
        model = Profile
        fields = ('picture8',)
        widgets = {
            'picture8' : forms.FileInput(attrs={'id':'id_profile_picture8'})
        }
        labels = {
            'picture8' : "#8"
        }

    def clean_picture(self):
        picture = self.cleaned_data['picture8']
        if not picture or not hasattr(picture, 'content_type'):
            raise forms.ValidationError('You must upload a picture')
        if not picture.content_type or not picture.content_type.startswith('image'):
            raise forms.ValidationError('File type is not image')
        if picture.size > MAX_UPLOAD_SIZE:
            raise forms.ValidationError('File too big (max size is {0} bytes)'.format(MAX_UPLOAD_SIZE))
        return 

class ProfilePicture9Form(forms.ModelForm):
    other_picture9 = forms.BooleanField(widget=forms.HiddenInput, initial=True)
    class Meta:
        model = Profile
        fields = ('picture9',)
        widgets = {
            'picture9' : forms.FileInput(attrs={'id':'id_profile_picture9'})
        }
        labels = {
            'picture9' : "#9"
        }

    def clean_picture(self):
        picture = self.cleaned_data['picture9']
        if not picture or not hasattr(picture, 'content_type'):
            raise forms.ValidationError('You must upload a picture')
        if not picture.content_type or not picture.content_type.startswith('image'):
            raise forms.ValidationError('File type is not image')
        if picture.size > MAX_UPLOAD_SIZE:
            raise forms.ValidationError('File too big (max size is {0} bytes)'.format(MAX_UPLOAD_SIZE))
        return 