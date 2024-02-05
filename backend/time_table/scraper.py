import requests
from bs4 import BeautifulSoup

def scrape_website(url, class_name):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    element = soup.find('table', class_='infobox')  # CSSセレクタを使用
    if element:
        return element.get_text()
    else:
        return "指定された要素が見つかりません。"