from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_delete
from django.utils.safestring import mark_safe
from django.template.defaultfilters import truncatechars
from django.conf import settings

# Create your models here.

class User(AbstractUser):
    address = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True)

class Book(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, null=False, blank=True, default='')
    price = models.IntegerField(null = False)
    publish_at = models.IntegerField(null = True)
    author = models.CharField(max_length=255, null=True, blank=True)
    type = models.CharField(max_length=255, null=True, blank=True)
    src_image = models.CharField(max_length=255, null=False, blank=True)
    image = models.ImageField(upload_to='books')
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,null=True)

    @property
    def short_description(self):
        return truncatechars(self.description, 20)
    
    def admin_photo(self):
        return mark_safe('<img src="{}" width="150" height="150" />'.format(self.image.url))
    admin_photo.short_description = 'Image'
    admin_photo.allow_tags = True
    
    def __str__(self):
        return self.name


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
    phone = models.CharField(max_length=10, null=False, blank=False)
    ship_address = models.CharField(max_length=255, null=False, blank=False)
    totalDue = models.IntegerField(null=False)
    status = models.CharField(max_length=255, null=False, blank=False)

class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete = models.CASCADE)
    book = models.ForeignKey(Book, on_delete = models.CASCADE)
    quantity = models.IntegerField(null=False, )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

@receiver(post_save, sender=Book)
def add_new_total_price(sender, instance, created, **kwargs):
    if created:
        book = Book.objects.get(id=instance.id)
        book.src_image = book.image.url.split('/')[-1]
        book.save()

