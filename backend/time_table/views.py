from django.shortcuts import render  # ステップ2で作成した関数をインポート
from .scraper import scrape_website
from .web_auto_scrape import web_auto

def search_class(request):
    if request.method == 'POST':
        url = 'https://ct.ritsumei.ac.jp/syllabussearch/'  # スクレイピングするURL
        web_auto(url)
        return render(request, 'time_table/result.html')
    return render(request, 'time_table/index.html')
