from django.urls import path, include
from . import views
from .views import Kamoku_table
from .views import GetSearchKamoku

urlpatterns = [
    path('', views.search_class, name='search_class'),
    path('merge/', views.merge_status, name='merge_status'),
    path('get/all/', Kamoku_table.as_view(), name='kamoku_table'),
    path('get/all/search/', GetSearchKamoku.as_view(), name='GetSearchBookList')
]
