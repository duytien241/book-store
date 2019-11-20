from django.contrib import admin, auth
from .models import User, Cart, Book
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserAdmin(auth.admin.UserAdmin):
    model = User
    search_fields = ('email',)


class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'book', 'quantity', 'created_at', 'updated_at')
    ordering = ('user',)
    search_fields = ('user',)

class BookAdmin(admin.ModelAdmin):
    #actions_selection_counter = True
    #actions_on_bottom = False
    #actions_on_top = True

    fields = ( 'name', 'description', 'price', 'author','src_image', 'image', 'admin_photo', 'publish_at','type')
    list_display = [
        'admin_photo',
        'name',
        'author',
        'price',
        'src_image',
        'type'
    ]
    list_display_links=[
        'name',
        'author'
    ]
    list_filter = [
        'name',
        'author',
    ]
    
    readonly_fields = ('publish_at','admin_photo')


admin.site.register(Book, BookAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(User, UserAdmin)
