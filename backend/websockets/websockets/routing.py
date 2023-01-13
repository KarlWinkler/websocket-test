from channels.routing import ProtocolTypeRouter, URLRouter
# import app.routing
from django.conf.urls import url
from django.urls import re_path
from messaging.consumers import ChatConsumer
websocket_urlpatterns = [
    url('/chat/', ChatConsumer),
]

# the websocket will open at 127.0.0.1:8000/chat/<room_name>
application = ProtocolTypeRouter({
    'websocket':
        URLRouter(
            websocket_urlpatterns
        )
    ,
})