from rest_framework import serializers

class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
