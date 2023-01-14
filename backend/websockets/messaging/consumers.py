import asyncio
import json
import random
from channels.consumer import AsyncConsumer

class ChatConsumer(AsyncConsumer):
  async def websocket_connect(self, event):
    print('connected', event)
    group = 'chat'
    self.group = group
    await self.channel_layer.group_add(
        group,
        self.channel_name
    )
    await self.send({
      "type": "websocket.accept"
    })


  async def websocket_receive(self, event):
    print('received', event)
    text = json.loads(event.get('text', None))

    text.update({'user': random.randint(0, 1) })

    await self.channel_layer.group_send(
      self.group,
      {
        "type": "websocket.send",
        "text": json.dumps(text)
      }
    )

  async def websocket_send(self, event):
    await self.send({
        "type": 'websocket.send',
        'text': event['text']
    })

  async def websocket_disconnect(self, event):
    print('disconnected', event)
    self.channel_layer.group_discard(
      'chat',
      self.channel_name
    )