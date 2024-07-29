#urls.py
from django.urls import path
from .views import get_votes, vote

urlpatterns = [
    path('votes_kinu/', get_votes, name='get_votes'),
    path('vote_kinu/', vote, name='vote'),
]
