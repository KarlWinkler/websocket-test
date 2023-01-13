import asyncio
import json
from channels.consumer import AsyncConsumer

class ChatConsumer(AsyncConsumer):
  async def websocket_connect(self, event):
    print('connected', event)
    await self.send({
      "type": "websocket.accept"
    })

  async def websocket_disconnect(self, event):
    print('disconnected', event)