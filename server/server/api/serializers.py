from .models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'first_name', 'last_name', 'email','password', 'phone', 'address')
        read_only_fields = ('id', 'username',)
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.username = user.email
        user.save()
        return user


class PasswordSerializer(serializers.Serializer):

    old_password = serializers.CharField(required=True)
    new_password1 = serializers.CharField(required=True)
    new_password2 = serializers.CharField(required=True)

    def validate(self, attrs):
        password1 = attrs['new_password1']
        password2 = attrs['new_password2']
        if password1 != password2:
            raise ValidationError('Hai mật khẩu không giống nhau.')
        return attrs
