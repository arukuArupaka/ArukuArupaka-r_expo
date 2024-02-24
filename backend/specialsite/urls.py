# specialsite/urls.py

from django.urls import path
from .views import AllSpecialView

urlpatterns = [
    path('specials/',AllSpecialView.as_view(), name='all-special'),
]

