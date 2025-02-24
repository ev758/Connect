from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path("ws/friend-request/<int:user_id>/", consumers.FriendRequestConsumer.as_asgi()),
    path("ws/send-message/<int:friend_id>/", consumers.SendMessageConsumer.as_asgi())
]