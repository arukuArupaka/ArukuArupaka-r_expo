# photo/views.py

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny  # この行を追加
from .models import Photo
from .serializer import PhotoSerializer
from rest_framework.response import Response


class PhotoListCreateView(generics.ListCreateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [IsAdminUser]  # 管理者のみアクセス可能にする

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class PhotoDeleteView(generics.DestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [IsAuthenticated]  # この行を追加

class AllPhotosView(generics.ListAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [AllowAny]  # 認証を必要としない

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        for item in data:
            item['image'] = request.build_absolute_uri(item['image'])
        return Response(data)