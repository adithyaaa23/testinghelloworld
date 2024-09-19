from django.urls import path
from .views import get_device,add_device

urlpatterns=[path('devices/',get_device),
             path('add-device/', add_device, name='add_device'),
]