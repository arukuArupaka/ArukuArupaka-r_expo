import requests
from bs4 import BeautifulSoup
from lxml import html

def scrape_website(html):
    tree = html.fromstring(html)
    element = tree.xpath("/html/body/div[1]/div[2]/div/div/form/table/tbody/tr[2]/td[2]/a")
    
    return element