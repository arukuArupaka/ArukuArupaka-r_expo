
# photo/views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny  # この行を追加
from .models import Special
from .serializer import SpecialSerializer
from rest_framework.response import Response


class SpecialListCreateView(generics.ListCreateAPIView):
    queryset = Special.objects.all()
    serializer_class = SpecialSerializer
    permission_classes = [IsAdminUser]  # 管理者のみアクセス可能にする

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class SpecialDeleteView(generics.DestroyAPIView):
    queryset = Special.objects.all()
    serializer_class = SpecialSerializer
    permission_classes = [IsAuthenticated]  # この行を追加

class AllSpecialView(generics.ListAPIView):
    queryset = Special.objects.all()
    serializer_class = SpecialSerializer
    permission_classes = [AllowAny]  # 認証を必要としない

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        for item in data:
            item['icon_image'] = request.build_absolute_uri(item['icon_image'])
        return Response(data)
    
