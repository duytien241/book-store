from .models import User, Book, Cart
from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'first_name', 'last_name', 'email','password', 'phone', 'address')
        read_only_fields = ('id', 'username', 'email')
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

class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = ('id', 'name', 'description', 'price', 'author','src_image', 'publish_at','type', 'created_at', 'updated_at')


class CartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cart
        fields = ('id', 'user', 'book', 'quantity', 'created_at', 'updated_at')

    def create(self, validated_data):
        if Cart.objects.filter(user=validated_data['user'], book=validated_data['book']).exists():
            cart = Cart.objects.filter(user=validated_data['user'], book=validated_data['book'])
            cart.update(quantity = cart.all().first().quantity + validated_data['quantity'] )
            return cart.all().first()
        else:
            cart = Cart.objects.create(**validated_data)
        return cart