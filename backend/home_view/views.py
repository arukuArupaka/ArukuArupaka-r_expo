from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response



# Create your views here.
@api_view(['GET'])
def helloworldfunc(request):
  person = {'name':'テスト', 'コードを書く場所':'home_viewのファイルの中は自由に変えてもらって大丈夫です。'}
  return Response(person)