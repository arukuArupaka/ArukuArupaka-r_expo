from rest_framework import serializers
from .models import BookMarketList

class BookMarketSerializer(serializers.Serializer):
  id=serializers.UUIDField()
  textbook_name = serializers.CharField(max_length=50)
  depertment=serializers.CharField(max_length=50)
  grade=serializers.IntegerField()
  all_grade=serializers.BooleanField(help_text='一般教養ならTrue')
  author=serializers.CharField(max_length=50)
  exhibitor = serializers.CharField(max_length=50)
  image = serializers.ImageField()

 # main_image = serializers.ImageField(upload_to='images/')
  date = serializers.DateTimeField()

  class Meta:
    model = BookMarketList
    fields = '__all__'

class HomeBookListSerializer(serializers.Serializer):
  id=serializers.UUIDField()
  textbook_name = serializers.CharField(max_length=50)
  author=serializers.CharField(max_length=50)
  image = serializers.ImageField()
 # main_image = serializers.ImageField(upload_to='images/')
  #date = serializers.DateTimeField(auto_now_add=True)

  class Meta:
    model = BookMarketList
    fields = ['textbook_name', 'author','id','image']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookMarketList
        fields = '__all__'
