from django.urls import path
from . import views

urlpatterns = [
    path('', views.search_class, name='search_class'),
    path('search_db/', views.search_db, name='search_db')
]
