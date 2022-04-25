from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, Http404
from django.urls import reverse

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from django.utils import timezone

from socialnetwork.forms import LoginForm, RegisterForm, ProfileForm, PostForm, ProfilePicture1Form, ProfilePicture2Form, ProfilePicture3Form, ProfilePicture4Form, ProfilePicture5Form, ProfilePicture6Form, ProfilePicture7Form, ProfilePicture8Form, ProfilePicture9Form
from socialnetwork.models import Post, Profile

def home_action(request):
    return render(request, 'socialnetwork/login.html', {})

@login_required
def global_action(request):
    print("global action called")
    context = { 'posts': Post.objects.all().order_by('-creation_time') }
    if request.method == 'POST':
        context['form'] = LoginForm()
        return render(request, 'socialnetwork/global.html', context)
    return render(request, 'socialnetwork/global.html', context)

@login_required
def follower_action(request):
    context = { 'posts': Post.objects.all().order_by('-creation_time') }
    return render(request, 'socialnetwork/follower.html', context)

""" @login_required
def my_profile_action(request):
    context = {}
    print('my profile action')
    if request.method == 'GET':
        print("get request")
        context = {'profile': request.user.profile, 
                   'form' : ProfileForm(initial={'bio': request.user.profile.bio})}
        return render(request, 'socialnetwork/myprofile.html', context)
   
    form = ProfileForm(request.POST, request.FILES)
    
    if not form.is_valid():
        print("invalid form?")
        context = {'profile': request.user.profile, 'form': form}
        return render(request, "socialnetwork/myprofile.html", context)

    print(request.FILES)
    profile = request.user.profile

    profile.picture = request.FILES['picture']
    profile.content_type = request.FILES['picture'].content_type
    profile.bio = request.POST['bio']
    profile.save()

    # context['items'] = Profile.objects.all()
    context['form']  = form
    context['profile'] = profile
    context['user'] = request.user
    return render(request, 'socialnetwork/myprofile.html', context) """

@login_required
def my_profile_action(request):
    context = {}
    print('my profile action')
    if request.method == 'GET':
        print("get request")
        context = {'profile': request.user.profile, 
                   'form' : ProfileForm(initial={'bio': request.user.profile.bio}),
                   'picture1Form': ProfilePicture1Form,
                   'picture2Form': ProfilePicture2Form,
                   'picture3Form': ProfilePicture3Form,
                   'picture4Form': ProfilePicture4Form,
                   'picture5Form': ProfilePicture5Form,
                   'picture6Form': ProfilePicture6Form,
                   'picture7Form': ProfilePicture7Form,
                   'picture8Form': ProfilePicture8Form,
                   'picture9Form': ProfilePicture9Form}
        return render(request, 'socialnetwork/myprofile.html', context)
   
    form = ProfileForm(request.POST, request.FILES)
    picture1Form = ProfilePicture1Form(request.POST, request.FILES)
    picture2Form = ProfilePicture2Form(request.POST, request.FILES)
    picture3Form = ProfilePicture3Form(request.POST, request.FILES)
    picture4Form = ProfilePicture4Form(request.POST, request.FILES)
    picture5Form = ProfilePicture5Form(request.POST, request.FILES)
    picture6Form = ProfilePicture6Form(request.POST, request.FILES)
    picture7Form = ProfilePicture7Form(request.POST, request.FILES)
    picture8Form = ProfilePicture8Form(request.POST, request.FILES)
    picture9Form = ProfilePicture9Form(request.POST, request.FILES)
    
    print("printing files")
    print(request.FILES)
    profile = request.user.profile

    if request.method == 'POST':
        if 'profile_picture' in request.POST:
            print("uploading profile picture above")
            form = ProfileForm(request.POST, request.FILES)
            profile.picture = request.FILES['picture']
            profile.content_type = request.FILES['picture'].content_type
            profile.bio = request.POST['bio']
            profile.save()
            
        if 'other_picture1' in request.POST:
            print("uploading picture 1")
            picture1Form = ProfilePicture1Form(request.POST, request.FILES)
            profile.picture1 = request.FILES['picture1']
            profile.content_type = request.FILES['picture1'].content_type
            profile.save()
        if 'other_picture2' in request.POST:
            print("uploading picture 2")
            picture2Form = ProfilePicture2Form(request.POST, request.FILES)
            profile.picture2 = request.FILES['picture2']
            profile.content_type = request.FILES['picture2'].content_type
            profile.save()
        if 'other_picture3' in request.POST:
            print("uploading picture 3")
            picture3Form = ProfilePicture3Form(request.POST, request.FILES)
            profile.picture3 = request.FILES['picture3']
            profile.content_type = request.FILES['picture3'].content_type
            profile.save()
        if 'other_picture4' in request.POST:
            print("uploading picture 4")
            picture4Form = ProfilePicture4Form(request.POST, request.FILES)
            profile.picture4 = request.FILES['picture4']
            profile.content_type = request.FILES['picture4'].content_type
            profile.save()
        if 'other_picture5' in request.POST:
            print("uploading picture 5")
            picture5Form = ProfilePicture5Form(request.POST, request.FILES)
            profile.picture5 = request.FILES['picture5']
            profile.content_type = request.FILES['picture5'].content_type
            profile.save()
        if 'other_picture6' in request.POST:
            print("uploading picture 6")
            picture6Form = ProfilePicture6Form(request.POST, request.FILES)
            profile.picture6 = request.FILES['picture6']
            profile.content_type = request.FILES['picture6'].content_type
            profile.save()
        if 'other_picture7' in request.POST:
            print("uploading picture 7")
            picture7Form = ProfilePicture7Form(request.POST, request.FILES)
            profile.picture7 = request.FILES['picture7']
            profile.content_type = request.FILES['picture7'].content_type
            profile.save()
        if 'other_picture8' in request.POST:
            print("uploading picture 8")
            picture8Form = ProfilePicture8Form(request.POST, request.FILES)
            profile.picture8 = request.FILES['picture8']
            profile.content_type = request.FILES['picture8'].content_type
            profile.save()
        if 'other_picture9' in request.POST:
            print("uploading picture 9")
            picture9Form = ProfilePicture9Form(request.POST, request.FILES)
            profile.picture9 = request.FILES['picture9']
            profile.content_type = request.FILES['picture9'].content_type
            profile.save()

    # context['items'] = Profile.objects.all()
    context['form']  = form
    context['picture1Form'] = picture1Form
    context['picture2Form'] = picture2Form
    context['picture3Form'] = picture3Form
    context['picture4Form'] = picture4Form
    context['picture5Form'] = picture5Form
    context['picture6Form'] = picture6Form
    context['picture7Form'] = picture7Form
    context['picture8Form'] = picture8Form
    context['picture9Form'] = picture9Form
    context['profile'] = profile
    context['user'] = request.user
    return render(request, 'socialnetwork/myprofile.html', context)



@login_required
def edit_item(request):
    if request.method == 'GET':
        context = {'profile': request.user.profile, 
                   'form' : ProfileForm(initial={'bio': request.user.profile.bio})}
        return render(request, 'socialnetwork/myprofile.html', context)

    form = ProfileForm(request.POST, request.FILES)
    if not form.is_valid():
        context = {'profile': request.user.profile, 'form': form}
        return render(request, "socialnetwork/myprofile.html", context)

    pic = form.cleaned_data['picture']
    print('Uploaded picture: {} (type={})'.format(pic, type(pic)))

    profile = request.user.profile
    profile.picture = form.cleaned_data['picture']
    profile.content_type = form.cleaned_data['picture'].content_type
    profile.save()

    context = {
        'items': Profile.objects.all(),
        'form': ProfileForm(),
        'message': 'Item #{} updated.'.format(item.id),
    }
    return render(request, 'socialnetwork/myprofile.html', context)
    
@login_required
def other_profile_action(request, id):
    print("others profile called")
    user = get_object_or_404(User, id=id)
    return render(request, 'socialnetwork/othersprofile.html', {'profile':user.profile})


@login_required
def post_action(request):
    print(request.POST)
    # Set context with current list of items so we can easily return if we discover errors.
    context = {}
    # Adds the new item to the database if the request parameter is present
    if 'newpost' not in request.POST or not request.POST['newpost']:
        print("error found")
        context['error'] = 'You must enter an post to add.'
        return render(request, 'socialnetwork/global.html', context)
    print("new post creation")
    new_post = Post(text=request.POST['newpost'], user=request.user, creation_time=timezone.now())
    new_post.save()
    print("new post creation")
    context = { 'posts': Post.objects.all().order_by('-creation_time') }
    return render(request, 'socialnetwork/global.html', context)

@login_required
def get_photo(request, id):
    item = get_object_or_404(Profile, id=id)
    print('Picture #{} fetched from db: {} (type={})'.format(id, item.picture, type(item.picture)))

    # Maybe we don't need this check as form validation requires a picture be uploaded.
    # But someone could have delete the picture leaving the DB with a bad references.
    if not item.picture:
        raise Http404

    return HttpResponse(item.picture, content_type=item.content_type)

@login_required
def get_photo1(request, id):
    item = get_object_or_404(Profile, id=id)
    print('[1] Picture #{} fetched from db: {} (type={})'.format(id, item.picture1, type(item.picture1)))

    # Maybe we don't need this check as form validation requires a picture be uploaded.
    # But someone could have delete the picture leaving the DB with a bad references.
    if not item.picture1:
        raise Http404

    return HttpResponse(item.picture1)

@login_required
def get_photo2(request, id):
    item = get_object_or_404(Profile, id=id)
    print('[2] Picture #{} fetched from db: {} (type={})'.format(id, item.picture2, type(item.picture1)))
    # Maybe we don't need this check as form validation requires a picture be uploaded.
    # But someone could have delete the picture leaving the DB with a bad references.
    if not item.picture2:
        raise Http404
    return HttpResponse(item.picture2)

@login_required
def get_photo3(request, id):
    item = get_object_or_404(Profile, id=id)
    if not item.picture3:
        raise Http404
    return HttpResponse(item.picture3)

@login_required
def get_photo4(request, id):
    item = get_object_or_404(Profile, id=id)
    if not item.picture4:
        raise Http404
    return HttpResponse(item.picture4)

@login_required
def get_photo5(request, id):
    item = get_object_or_404(Profile, id=id)
    if not item.picture5:
        raise Http404
    return HttpResponse(item.picture5)

@login_required
def get_photo6(request, id):
    item = get_object_or_404(Profile, id=id)
    if not item.picture6:
        raise Http404
    return HttpResponse(item.picture6)

@login_required
def get_photo7(request, id):
    item = get_object_or_404(Profile, id=id)
    if not item.picture7:
        raise Http404
    return HttpResponse(item.picture7)

@login_required
def get_photo8(request, id):
    item = get_object_or_404(Profile, id=id)
    if not item.picture8:
        raise Http404
    return HttpResponse(item.picture8)

@login_required
def get_photo9(request, id):
    item = get_object_or_404(Profile, id=id)
    if not item.picture9:
        raise Http404
    return HttpResponse(item.picture9)


def unfollow(request, id):
    
    user_to_unfollow = get_object_or_404(User, id=id)
    request.user.profile.following.remove(user_to_unfollow)
    request.user.profile.save()
    return render(request, 'socialnetwork/othersprofile.html', {'profile':user_to_unfollow.profile})


def follow(request, id):
    user_to_follow = get_object_or_404(User, id=id)
    request.user.profile.following.add(user_to_follow)
    request.user.profile.save()
    return render(request, 'socialnetwork/othersprofile.html', {'profile':user_to_follow.profile})
    
def test_action(request):
    context = {}
    
    # Just display the registration form if this is a GET request.
    if request.method == 'GET':
        context['form'] = LoginForm()
        return render(request, 'socialnetwork/registerRoom.html', context)

def globalroom_action(request):
    context = {}
    
    # Just display the registration form if this is a GET request.
    if request.method == 'GET':
        context['form'] = LoginForm()
        return render(request, 'socialnetwork/globalRoom.html', context)

def battle_action(request):
    context = {}
    
    # Just display the registration form if this is a GET request.
    if request.method == 'GET':
        context['form'] = LoginForm()
        return render(request, 'socialnetwork/battle.html', context)

def mp_action(request):
    context = {}
    
    # Just display the registration form if this is a GET request.
    if request.method == 'GET':
        context['form'] = LoginForm()
        return render(request, 'socialnetwork/mp.html', context)

def mainzone_action(request):
    context = {}
    
    # Just display the registration form if this is a GET request.
    if request.method == 'GET':
        context['form'] = LoginForm()
        return render(request, 'socialnetwork/index.html', context)

def test3_action(request):
    context = {}
    
    # Just display the registration form if this is a GET request.
    if request.method == 'GET':
        context['form'] = LoginForm()
        return render(request, 'socialnetwork/myRoom.html', context)

def test2_action(request):
    context = {}
    
    # Just display the registration form if this is a GET request.
    if request.method == 'GET':
        return render(request, 'socialnetwork/login.html', context)

def login_action(request):
    context = {}
    
    # Just display the registration form if this is a GET request.
    if request.method == 'GET':
        context['form'] = LoginForm()
        return render(request, 'socialnetwork/login.html', context)

    # Creates a bound form from the request POST parameters and makes the 
    # form available in the request context dictionary.
    form = LoginForm(request.POST)
    context['form'] = form

    # Validates the form.
    if not form.is_valid():
        return render(request, 'socialnetwork/login.html', context)

    new_user = authenticate(username=form.cleaned_data['username'],
                            password=form.cleaned_data['password'])

    login(request, new_user)
    return render(request, 'socialnetwork/index.html', context)
    #return redirect(reverse('global'))

def logout_action(request):
    logout(request)
    return redirect(reverse('login'))


def register_action(request):
    context = {}

    # Just display the registration form if this is a GET request.
    if request.method == 'GET':
        context['form'] = RegisterForm()
        return render(request, 'socialnetwork/register.html', context)

    # Creates a bound form from the request POST parameters and makes the 
    # form available in the request context dictionary.
    form = RegisterForm(request.POST)
    context['form'] = form

    # Validates the form.
    if not form.is_valid():
        return render(request, 'socialnetwork/register.html', context)

    # At this point, the form data is valid.  Register and login the user.
    new_user = User.objects.create_user(username=form.cleaned_data['username'], 
                                        password=form.cleaned_data['password1'],
                                        email=form.cleaned_data['email'],
                                        first_name=form.cleaned_data['first_name'],
                                        last_name=form.cleaned_data['last_name'])
    new_user.save()

    new_user = authenticate(username=form.cleaned_data['username'],
                            password=form.cleaned_data['password1'])
    profile = Profile(bio="", user=new_user)
    profile.content_type = "image/webp"
    profile.save()
    login(request, new_user)
    return redirect(reverse('mainzone'))
