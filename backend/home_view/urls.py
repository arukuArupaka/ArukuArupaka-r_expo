# photo/urls.py

from django.urls import path
from .views import AllPhotosView

urlpatterns = [
    path('photo/',AllPhotosView.as_view(), name='all-photos'),
]

