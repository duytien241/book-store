from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    address = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True)

class Book(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, null=True, blank=True, default='')
    price = models.IntegerField(null = False)
    publish_at = models.IntegerField(null = True)
    author = models.CharField(max_length=255, null=True, blank=True)
    type = models.CharField(max_length=255, null=True, blank=True)
    src_image = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,null=True)


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    book = models.ForeignKey(Book, on_delete = models.CASCADE)
    quantity = models.IntegerField(null=False, default=1)
    total_price = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    ship_address = models.CharField(max_length=255, null=True, blank=True)
    totalDue = models.IntegerField(null=False)

class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete = models.CASCADE)
    book = models.ForeignKey(Book, on_delete = models.CASCADE)
    quantity = models.IntegerField(null=False, )
    price = models.IntegerField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
