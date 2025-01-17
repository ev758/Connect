from connect.serializers import UserSerializer
from django.contrib.auth import get_user_model
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

#gets custom User model
User = get_user_model()

def connect(request):
    return HttpResponse("Connect")

#sends access and refresh token
class Tokens(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        #declarations
        fields = []
        values = []

        #gets keys and adds a key to fields list
        for key in request.data.keys():
            fields.append(key)
        
        #gets values and adds a value to values list
        for value in request.data.values():
            values.append(value)

        #if field is email, get user object from database by email and check password to see if it matches
        if fields[0] == "email":
            user = User.objects.get(email=values[0])

            #if user object is not null, check password
            if user is not None:
                #if password matches, send access and refresh token
                if user.check_password(values[1]):
                    refresh = RefreshToken.for_user(user)
                    jwt_tokens = {"refresh": str(refresh), "access": str(refresh.access_token)}

                    return JsonResponse(jwt_tokens)
            
            raise ValueError("User account does not exist")
        else:
        #if field is username, get user object from database by username and check password to see if it matches
            user = User.objects.get(username=values[0])

            #if user object is not null, check password
            if user is not None:
                #if password matches, send access and refresh token
                if user.check_password(values[1]):
                    refresh = RefreshToken.for_user(user)
                    jwt_tokens = {"refresh": str(refresh), "access": str(refresh.access_token)}

                    return JsonResponse(jwt_tokens)
            
            raise ValueError("User account does not exist")

class CreateAccount(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]