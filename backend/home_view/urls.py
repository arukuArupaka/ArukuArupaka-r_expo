# photo/urls.py

from django.urls import path
from .views import PhotoListCreateView

urlpatterns = [
    path('photos/', PhotoListCreateView.as_view(), name='photo-list-create'),
]

