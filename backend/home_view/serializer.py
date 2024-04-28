# photo/serializer.py

from rest_framework import serializers
from .models import Photo

class PhotoSerializer(serializers.ModelSerializer): 
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ['title', 'description', 'image', 'image_url', 'carousel_url']  # carousel_url を fields に追加

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url)
        return request.build_absolute_uri(obj.image.url)
