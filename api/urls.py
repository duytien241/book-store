from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.urlpatterns import format_suffix_patterns
from django.contrib.auth.views import PasswordResetView, LogoutView
from django.urls import include, path
from django.contrib import admin
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

order_detail = views.OrderDetailList.as_view({
    'post': 'create',
    'get': 'list',
})

order_detail_id = views.OrderDetailList.as_view({
    'get': 'retrieve',
})

urlpatterns = [
    path('me', views.Me.as_view(), name='me'),
    path('admin/', admin.site.urls),
    path('logout/', views.Logout.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
    path('users', views.Users.as_view(), name='users-list'),
    path('user/<int:pk>/', user_detail, name='user-detail'),
    path('user/changepassword/', views.ChangePassword.as_view(), name='change-password'),
    path('books/', views.Books.as_view(), name='book-list'),
    path('book/<int:pk>/', book_detail, name='book_detail'),
    path('orders/', views.OrderHeader.as_view(), name='order-list'),
    path('order/', order_detail, name='order_detail'),
    path('order/<int:order>/', order_detail_id, name='order_detail_id'),
    path('cart/', views.Cart.as_view(), name='cart'),
    path('cart/<int:pk>', cart_del, name='delete-cart'),
]
urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'xml'])
