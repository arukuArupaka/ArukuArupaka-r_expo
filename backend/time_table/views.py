from django.shortcuts import render  # ステップ2で作成した関数をインポート
from .web_auto import web_search
from time_table.models import Kamoku
from .syllabus import syllabus
from django.db import connection
import re
import datetime
from asgiref.sync import sync_to_async
import asyncio
from django.db.models import Q
from rest_framework import viewsets
from .serializers import MyModelSerializer

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

def search_db(request):
    if request.method == 'POST':
        kamoku_department = request.POST.get('department')
        kamoku_time = request.POST.get('time')
        kamoku_day = request.POST.get('day')
        kamoku_season = request.POST.get('season')
        
        # filter() メソッドを使って複数の結果を取得する
        results = Kamoku.objects.filter(kamoku_department = kamoku_department, kamoku_time=kamoku_time, kamoku_day=kamoku_day, kamoku_season = kamoku_season)
        
        if kamoku_department == None or kamoku_time == None or kamoku_day == None or kamoku_season == None:
            results = Kamoku.objects.filter(Q(kamoku_department = kamoku_department) | Q(kamoku_time = kamoku_time) | Q(kamoku_day=kamoku_day) | Q(kamoku_season = kamoku_season))
        
        count = results.count() # QuerySetのcount() メソッドを使用して結果の数を取得
        
        return render(request, 'time_table/result_search.html', {"results": results, "count": count})
    
    return render(request, 'time_table/search.html')

class MyModelViewSet(viewsets.ModelViewSet):
    queryset = Kamoku.objects.all()
    serializer_class = MyModelSerializer