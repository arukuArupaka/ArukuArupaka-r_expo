# specialcity/serializer.py
from rest_framework import serializers
from .models import Special

class SpecialSerializer(serializers.ModelSerializer):
    icon_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Special
        fields = ['title', 'page_name', 'icon_image', 'icon_image_url', 'frame_color', 'destination_url']

    def get_icon_image_url(self, obj):
        request = self.context.get('request')
        if obj.icon_image and hasattr(obj.icon_image, 'url'):
            return request.build_absolute_uri(obj.icon_image.url)
        return None
