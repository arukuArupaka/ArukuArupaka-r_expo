from rest_framework import serializers
from time_table.models import Kamoku

class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kamoku
        fields = '__all__'
