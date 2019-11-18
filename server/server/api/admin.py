from django.contrib import admin, auth
from .models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserAdmin(auth.admin.UserAdmin):
    model = User
    search_fields = ('email',)


admin.site.register(User, UserAdmin)
