#urls.py
from django.urls import path
from .views import get_votes, vote

urlpatterns = [
    path('votes_oic/', get_votes, name='get_votes'),
    path('vote_oic/', vote, name='vote'),
]
