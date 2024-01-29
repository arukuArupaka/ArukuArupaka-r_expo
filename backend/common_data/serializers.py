from rest_framework import serializers
from .models import CommonUserData

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommonUserData
        fields = ('user_id','user_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

        def create(self, validated_data):
            user = CommonUserData.objects.create_user(**validated_data)
            return user