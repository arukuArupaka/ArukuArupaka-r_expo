from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .common.multiple_field_lookup_mixin import MultipleFieldLookupMixin


from .models import BookMarketList
from .serializers import BookMarketSerializer,HomeBookListSerializer,PostSerializer

from rest_framework import generics



def helloworldfunc(request):
    return HttpResponse('helloMarket')

# Create your views here.

#@api_view(['GET'])
def getData(request):
  person = {'name':'Shiro', 'age':31}
  return Response(person)


# class GetAllBookList(viewsets.ModelViewSet):
#   queryset = BookMarketList.objects.all().order_by('-author')
#   serializer_class = BookMarketSerializer


#完成
class GetAllBookList(generics.ListAPIView):
  queryset = BookMarketList.objects.all()
  serializer_class = BookMarketSerializer

#完成
class GetHomeBookList(generics.ListAPIView):
  queryset = BookMarketList.objects.all()
  serializer_class = HomeBookListSerializer
  
#完成
class GetSearchBookList(generics.ListAPIView):
  queryset = BookMarketList.objects.all()
  serializer_class = BookMarketSerializer
  def get_queryset(self):
    queryset = BookMarketList.objects.all()
    search_word = self.request.query_params.get('search_word', None)
    if search_word is not None:
      queryset = queryset.filter(textbook_name__icontains=search_word).union(queryset.filter(author__icontains=search_word)).union(queryset.filter(exhibitor__icontains=search_word))
    return queryset

#完成
class GetBookDetail(generics.RetrieveAPIView):
  queryset = BookMarketList.objects.all()
  serializer_class = BookMarketSerializer
  lookup_field = 'id'

class AddSearchBookList(generics.CreateAPIView):
  queryset = BookMarketList.objects.all()
  serializer_class = PostSerializer

class DestoryBookList(generics.DestroyAPIView):
  queryset = BookMarketList.objects.all()
  serializer_class = BookMarketSerializer
  lookup_field = 'id'

class UpdateBookList(generics.UpdateAPIView):
  queryset = BookMarketList.objects.all()
  serializer_class = PostSerializer
  lookup_field = 'id'

class Test(generics.RetrieveAPIView):
    serializer_class = HomeBookListSerializer
    queryset = BookMarketList.objects.all()
    lookup_url_kwarg='textbook_name'
