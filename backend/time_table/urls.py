from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import MyModelViewSet

router = DefaultRouter()
router.register(r'mymodel', MyModelViewSet)

urlpatterns = [
    path('', views.search_class, name='search_class'),
    path('search_db/', views.search_db, name='search_db'),
    path('', include(router.urls))
]
