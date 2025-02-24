import json
from channels.generic.websocket import AsyncWebsocketConsumer

class FriendRequestConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "friend_request_notification" + str(self.scope["url_route"]["kwargs"]["user_id"])

        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)
    
    #receives friend request notification
    async def receive(self, text_data):
        #declarations
        text_data_json = json.loads(text_data)
        notification = text_data_json["notification"]

        event = {
            "type": "friend_request",
            "notification": notification
        }

        await self.channel_layer.group_send(self.group_name, event)

    #sends friend request notification
    async def friend_request(self, event):
        notification = event["notification"]

        await self.send(text_data=json.dumps({
            'notification': notification
        }))

class SendMessageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "chat" + str(self.scope["url_route"]["kwargs"]["friend_id"])

        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)
    
    #receives message
    async def receive(self, text_data):
        #declarations
        text_data_json = json.loads(text_data)
        user_id = text_data_json["id"]
        message = text_data_json["message"]

        event = {
            "type": "send_message",
            "id": user_id,
            "message": message
        }

        await self.channel_layer.group_send(self.group_name, event)

    #sends message
    async def send_message(self, event):
        #declarations
        user_id = event["id"]
        message = event["message"]

        await self.send(text_data=json.dumps({
            "id": user_id,
            "message": message
        }))