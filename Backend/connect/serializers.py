from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Friends, FriendMessages, ForgotPassword

#gets custom User model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friends
        fields = ["friend_id", "friend_status", "blocked", "pending", "sender", "receiver"]
        extra_kwargs = {"sender": {"read_only": True}, "receiver": {"read_only": True}}

class FriendMessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendMessages
        fields = ["friend_message_id", "friend_message", "date", "chat_name", "chat_user"]
        extra_kwargs = {"chat_user": {"read_only": True}}

class ForgotPasswordSerializer(serializers.ModelSerializer):
    model = ForgotPassword
    fields = ["email", "password_reset_token", "user"]
    extra_kwargs = {"user": {"read_only": True}}