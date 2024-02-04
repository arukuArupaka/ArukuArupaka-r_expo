# photo/views.py

from rest_framework import generics
from .models import Photo
from .serializer import PhotoSerializer

class PhotoListCreateView(generics.ListCreateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # ユーザーに関連付ける