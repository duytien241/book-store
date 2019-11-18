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

book_detail = views.BookIformationUser.as_view({
    'get': 'retrieve',
})

cart_del = views.DeleteCart.as_view({
    'delete': 'destroy'
})


urlpatterns = [
    path('me', views.Me.as_view(), name='me'),
    path('logout/', views.Logout.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
    path('users', views.Users.as_view(), name='users-list'),
    path('book/<int:pk>/', book_detail, name='book_detail'),
    path('user/<int:pk>/', user_detail, name='user-detail'),
    path('user/changepassword/', views.ChangePassword.as_view(), name='change-password'),
    path('books/', views.Books.as_view(), name='book-list'),
    path('cart/', views.Cart.as_view(), name='cart'),
    path('cart/<int:pk>', cart_del, name='delete-cart'),
]
urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'xml'])
