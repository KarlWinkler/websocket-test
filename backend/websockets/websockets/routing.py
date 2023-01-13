from channels.routing import ProtocolTypeRouter, URLRouter
# import app.routing
# from django.conf.urls import url
from django.urls import path
from messaging.consumers import ChatConsumer

# the websocket will open at 127.0.0.1:8000/chat/
application = ProtocolTypeRouter({
    'websocket':
        URLRouter(
            [
                path('chat/', ChatConsumer.as_asgi()),
            ]
        )
    ,
})