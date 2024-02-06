from django.urls import path
from . import views

urlpatterns = [
    path('', views.search_class, name='search_class'),
]
