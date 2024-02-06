from django.shortcuts import render  # ステップ2で作成した関数をインポート
from .scraper import scrape_website
from .web_auto import web_search

def search_class(request):
    if request.method == 'POST': 
        select_day = request.POST.get('day_select')
        select_time = request.POST.get('time_select')
        select_season = request.POST.get('season_select')
        select_department = request.POST.get('department_select')
        class_name = request.POST.get('class_name')
        
        
        url = "https://ct.ritsumei.ac.jp/syllabussearch/"
        results = web_search(url, select_season, select_time, select_day, select_department, class_name)
        
        
        return render(request, 'time_table/result.html', {"results":results})
    return render(request, 'time_table/index.html')
