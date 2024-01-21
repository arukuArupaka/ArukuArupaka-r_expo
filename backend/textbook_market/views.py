from django.shortcuts import render
from django.http import HttpResponse

def helloworldfunc(request):
    return HttpResponse('helloMarket')

# Create your views here.
