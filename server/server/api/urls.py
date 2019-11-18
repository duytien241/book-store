from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.urlpatterns import format_suffix_patterns
from django.contrib.auth.views import PasswordResetView, LogoutView
from django.urls import include, path
from . import views

user_detail = views.EditIformationUser.as_view({
    'get': 'retrieve',
    'put': 'update',
})


urlpatterns = [
    path('me', views.Me.as_view(), name='me'),
    path('logout/', views.Logout.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
    path('users', views.Users.as_view(), name='users-list'),
    path('user/<int:pk>/', user_detail, name='user-detail'),
    path('user/changepassword/', views.ChangePassword.as_view(), name='change-password'),
]
urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'xml'])
