from connect.serializers import UserSerializer, FriendSerializer, FriendMessagesSerializer
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Friends, FriendMessages

#gets custom User model
User = get_user_model()

def connect(request):
    return HttpResponse("Connect")

class CreateAccount(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

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

class Profile(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    #gets user object
    def get_object(self):
        return self.request.user
    
    #updates user data
    def post(self, request):
        user = self.request.user

        #if password is null, only update first name, last name, email and username
        if (request.data["password"] == None):
            user.first_name = request.data["first_name"]
            user.last_name = request.data["last_name"]
            user.email = request.data["email"]
            user.username = request.data["username"]
            user.save()
        else:
            user.first_name = request.data["first_name"]
            user.last_name = request.data["last_name"]
            user.email = request.data["email"]
            user.username = request.data["username"]
            user.set_password(request.data["password"])
            user.save()
        
        return HttpResponse("Updated Profile")
    
    #deletes user
    def perform_destroy(self, instance):
        instance.delete()

#gets list of users by name
class UserList(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        #declarations
        name = self.kwargs["user"].split()
        length = len(name)

        if (length == 1):
            return User.objects.filter(~Q(id=self.request.user.id), Q(first_name=name[0]) | Q(last_name=name[0]))
        elif (length == 2):
            return User.objects.filter(~Q(id=self.request.user.id), Q(first_name=name[0]), Q(last_name=name[1]))
        else:
            return HttpResponse("No users")
        
        raise ValueError("User accounts do not exist")

#creates friend request
class FriendRequest(generics.CreateAPIView):
    serializer_class = FriendSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            receiver = User.objects.get(pk=self.kwargs["receiver_id"])
            serializer.save(sender=self.request.user, receiver=receiver)
        else:
            print(serializer.errors)

#gets pending friend requests
class FriendRequestList(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        friend_request_list = []

        for friend_request in Friends.objects.filter(pending=True, receiver=self.request.user):
            friend_request_list.append(User.objects.get(pk=friend_request.sender.id))
        
        return friend_request_list

#accepts or declines friend request
class FriendOption(generics.UpdateAPIView):
    def put(self, request):
        friend_request = Friends.objects.get(sender=request.data["sender"], receiver=self.request.user)
        
        if (request.data["friend_status"]):
            friend_request.friend_status = request.data["friend_status"]
            friend_request.pending = False
            friend_request.save()
            return HttpResponse("Friend request accepted")
        else:
            friend_request.delete()
            return HttpResponse("Friend request declined")

#gets friend status
class FriendStatus(generics.RetrieveAPIView):
    serializer_class = FriendSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        #declarations
        sender = User.objects.get(id=self.kwargs["user_id"])
        receiver = User.objects.get(id=self.kwargs["user_id2"])

        try:
            friend = Friends.objects.get(friend_status=True, sender=sender, receiver=receiver)
            return friend
        except Friends.DoesNotExist:
            friend = Friends.objects.get(friend_status=True, sender=receiver, receiver=sender)
            return friend

#gets friends list
class FriendsList(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        friends_list = []

        for friend in Friends.objects.filter(friend_status=True):
            #if user is sender, add user's friend to list
            if friend.sender == self.request.user:
                friends_list.append(User.objects.get(pk=friend.receiver.id))
            #if user is receiver, add user's friend to list
            elif friend.receiver == self.request.user:
                friends_list.append(User.objects.get(pk=friend.sender.id))
        
        return friends_list

#removes friend
class RemoveFriend(generics.DestroyAPIView):
    serializer_class = FriendSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, user_id, user_id2):
        #declarations
        sender = User.objects.get(id=user_id)
        receiver = User.objects.get(id=user_id2)

        try:
            friend = Friends.objects.get(friend_status=True, sender=sender, receiver=receiver)
            friend.delete()
            return HttpResponse("Removed friend")
        except Friends.DoesNotExist:
            friend = Friends.objects.get(friend_status=True, sender=receiver, receiver=sender)
            friend.delete()
            return HttpResponse("Removed friend")

#gets messages of conversation
class MessagesList(generics.ListAPIView):
    serializer_class = FriendMessagesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        messages = FriendMessages.objects.filter(chat_name=self.kwargs["chat_name"])
        return messages

#creates friend message
class SendMessage(generics.CreateAPIView):
    serializer_class = FriendMessagesSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        friend_message = FriendMessages.objects.create(
            friend_message=request.data["friend_message"],
            chat_name=request.data["chat_name"],
            chat_user_id=self.request.user.id)
        friend_message.save()
        
        return HttpResponse("Created friend message")

#gets latest message list
class LatestMessageList(generics.ListAPIView):
    serializer_class = FriendMessagesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        #declarations
        friend_id_list = []
        friend_messages_list = []
        index = 0

        for friend in Friends.objects.filter(friend_status=True):
            #if user is sender or receiver, add friend id to list
            if friend.sender == self.request.user or friend.receiver == self.request.user:
                friend_id_list.append(friend.friend_id)

        while index != len(friend_id_list):
            #gets latest message from database by chat name
            friend_message = FriendMessages.objects.filter(chat_name="chat" + str(friend_id_list[index])).last()

            #if latest message is not null, add to list of friend messages
            if friend_message is not None:
                friend_messages_list.append(friend_message)
            
            index += 1
        
        return friend_messages_list

#gets the names of user's friends by latest messages
class FriendNamesList(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        #declarations
        friends_list = []
        friend_id_list = []
        index = 0

        for friend in Friends.objects.filter(friend_status=True):
            #if user is sender, add user's friend and friend id to lists
            if friend.sender == self.request.user:
                friends_list.append(User.objects.get(pk=friend.receiver.id))
                friend_id_list.append(friend.friend_id)
            #if user is receiver, add user's friend and friend id to lists
            elif friend.receiver == self.request.user:
                friends_list.append(User.objects.get(pk=friend.sender.id))
                friend_id_list.append(friend.friend_id)

        while index != len(friends_list):
            #gets latest message from database by chat name
            friend_message = FriendMessages.objects.filter(chat_name="chat" + str(friend_id_list[index])).last()

            #if latest message is not null, increment to continue to loop through the lists
            if friend_message is not None:
                index += 1
            #if latest message is null, remove user's friend and friend id from the lists
            else:
                friends_list.pop(index)
                friend_id_list.pop(index)
        
        return friends_list