from django.urls import path
from socialnetwork import views

urlpatterns = [
    path('', views.test_action, name='test'),
    path('test3', views.test3_action, name='test3'),
    path('mainzone', views.mainzone_action, name='mainzone'),
    path('globalroom', views.globalroom_action, name='globalroom'),
    path('battle', views.battle_action, name='battle'),
    path('mp', views.mp_action, name='mp'),
    path('test2', views.login_action, name='test2'),
    path('login', views.login_action, name='login'),
    path('logout', views.logout_action, name='logout'), 
    path('register', views.register_action, name='register'),
    path('global',views.global_action, name='global'),
    path('follower',views.follower_action, name='follower'),
    path('myprofile',views.my_profile_action, name='myprofile'),
    path('othersprofile/<int:id>',views.other_profile_action, name='othersprofile'),
    path('photo/<int:id>', views.get_photo, name= 'photo'),
    path('photo1/<int:id>', views.get_photo1, name= 'photo1'),
    path('photo2/<int:id>', views.get_photo2, name= 'photo2'),
    path('photo3/<int:id>', views.get_photo3, name= 'photo3'),
    path('photo4/<int:id>', views.get_photo4, name= 'photo4'),
    path('photo5/<int:id>', views.get_photo5, name= 'photo5'),
    path('photo6/<int:id>', views.get_photo6, name= 'photo6'),
    path('photo7/<int:id>', views.get_photo7, name= 'photo7'),
    path('photo8/<int:id>', views.get_photo8, name= 'photo8'),
    path('photo9/<int:id>', views.get_photo9, name= 'photo9'),
    path('newpost', views.post_action, name='newpost'),
    path('follow/<int:id>', views.follow, name= 'follow'),
    path('unfollow/<int:id>', views.unfollow, name= 'unfollow'),
    
    

]

