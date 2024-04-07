from django.shortcuts import render  # ステップ2で作成した関数をインポート
from .web_auto import web_search
from time_table.models import Kamoku
from .syllabus import syllabus
from django.db import connection
import re
import datetime
from asgiref.sync import sync_to_async
import asyncio
from .serializers import MyModelSerializer
from rest_framework import generics
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from .kamoku_status import kamoku_status
from .rename_classroom import rename_classroom

async def search_class(request):
    if request.method == 'POST': 
        # POSTリクエストから各パラメータを取得
        select_day = request.POST.get('day_select')
        select_time = request.POST.get('time_select')
        select_season = request.POST.get('season_select')
        select_department = request.POST.get('department_select')
        class_name = request.POST.get('class_name')
        start_time = datetime.datetime.now()
        # URLとフォームから取得したパラメータをweb_search関数に渡して非同期処理を実行
        url = "https://ct.ritsumei.ac.jp/syllabussearch/"
        await web_search(url, select_season, select_time, select_day, select_department, class_name)

        # 現在時刻を取得
        end_time = datetime.datetime.now()

        # Djangoのモデル操作を非同期にラップしてkamoku_listsを取得
        kamoku_lists = await sync_to_async(Kamoku.objects.all)()

        # render関数を非同期に実行してレスポンスを生成
        response = await sync_to_async(lambda: render(request, 'time_table/result.html', {"kamoku_lists":kamoku_lists, "start_time":start_time, "end_time":end_time}))()

        return response

    # GETリクエストの場合の処理
    return await sync_to_async(lambda: render(request, 'time_table/index.html'))()

async def merge_status(request):
    if request.method == 'POST':
        department = request.POST.get('department_select')
        await kamoku_status(department)
        response = await sync_to_async(render)(request, 'time_table/merge_result.html')
        return response
    return await sync_to_async(lambda: render(request, 'time_table/merge.html'))()

async def rename_class(request):
    if request.method == 'POST':
        rename_classroom()
        response = await sync_to_async(render)(request, 'time_table/rename_result.html')
        return response
    return await sync_to_async(lambda: render(request, 'time_table/rename.html'))()
        

from rest_framework import generics

class Kamoku_table(generics.ListAPIView):
  queryset = Kamoku.objects.all()
  serializer_class = MyModelSerializer

class GetSearchKamoku(APIView):
    def get(self, request, *args, **kwargs):
        # クエリパラメータを取得
        kamoku_department = request.query_params.get('kamoku_department', None)
        kamoku_day = request.query_params.get('kamoku_day', None)
        kamoku_time = request.query_params.get('kamoku_time', None)
        kamoku_season = request.query_params.get('kamoku_season', None)
        
        # フィルタリング条件に基づいてLessonオブジェクトを取得
        queryset = Kamoku.objects.all()
        if kamoku_department:
            queryset = queryset.filter(kamoku_department=kamoku_department)
        if kamoku_day:
            queryset = queryset.filter(kamoku_day=kamoku_day)
        if kamoku_time:
            queryset = queryset.filter(kamoku_time=kamoku_time)
        if kamoku_season:
            queryset = queryset.filter(kamoku_season=kamoku_season)
        
        # シリアライズしてレスポンスを返す
        serializer = MyModelSerializer(queryset, many=True)
        return Response(serializer.data)

"""
class GetSearchKamoku(generics.ListAPIView):
    serializer_class = MyModelSerializer

    def get_queryset(self):
        search_word = self.request.query_params.get('search_word', None)
        if search_word is not None:
            queryset = Kamoku.objects.filter(
                Q(kamoku_department__icontains=search_word)
            )
            return queryset
        return Kamoku.objects.none()
"""



# def search_db(request):
    #query = request.GET.get('query', None)

    #if query is not None:
    # 5桁の数字であるかどうかを判断
        #if re.match(r'^\d{5}$', query):
            # 5桁の数字の場合、kamoku_numを検索
            #sql = "SELECT * FROM Kamoku WHERE kamoku_num = %s"
        #else:
            # それ以外の場合、kamoku_nameを検索
            #sql = "SELECT * FROM Kamoku WHERE kamoku_name LIKE %s"

        #with connection.cursor() as cursor:
            #cursor.execute(sql, [query])
            #results = cursor.fetchall()

        # resultsをテンプレートに渡して表示
        #return render(request, 'time_table/result_search.html', {'results': results})
    #else:
        # GETリクエストのクエリパラメータ 'query' が存在しない場合、
        # 検索フォームを表示するsearch.htmlをレンダリング
        #return render(request, 'time_table/search.html')
