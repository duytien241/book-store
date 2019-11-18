
from rest_framework import generics, filters, status, viewsets, permissions
from rest_framework.exceptions import ParseError, ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from django.http import JsonResponse
from django.contrib.auth.password_validation import validate_password
from django.shortcuts import get_object_or_404, redirect
from .serializers import UserSerializer, PasswordSerializer
from .models import User

class Me(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user, context={'request': request})
        return Response(serializer.data)

class ChangePassword(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = PasswordSerializer(data=request.data)

        if serializer.is_valid():
            old_password = serializer.data.get("old_password")
            new_password = serializer.data.get("new_password1")
            rx = re.compile(r'[A-Za-z0-9@#$%^&+=]{8,}')
            if not self.object.check_password(old_password):
                return Response({"message": "Sai mật khẩu"}, 
                                status=status.HTTP_400_BAD_REQUEST)
            if  rx.match(new_password) is None:
                return Response({"message": "Mật khẩu mới không hợp lệ"}, 
                                status=status.HTTP_400_BAD_REQUEST)
            validate_password(password = new_password, user=self.request.user )
            self.object.set_password(serializer.data.get("new_password1"))
            self.object.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditIformationUser(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

    def update(self, request, pk=None):
        queryset = User.objects.filter(pk=pk)
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if (serializer.is_valid() and (self.request.user.is_staff or self.request.user == user)):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        queryset = User.objects.filter(pk=pk)
        user = get_object_or_404(queryset, pk=pk)
        if self.request.user.is_staff or self.request.user == user:
            serializer = UserSerializer(user)
            return Response(serializer.data)
        return JsonResponse({'message':'Bạn không có quyền truy cập!'}, status=status.HTTP_401_UNAUTHORIZED)

class Users(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    pagination_class = None
    queryset = User.objects.all()

class Logout(APIView):
    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)