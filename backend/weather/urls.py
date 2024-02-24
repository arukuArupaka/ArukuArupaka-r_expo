#urls.py
from django.urls import path
from .views import get_votes, vote

urlpatterns = [
    path('votes/', get_votes, name='get_votes'),
    path('vote/', vote, name='vote'),
]
