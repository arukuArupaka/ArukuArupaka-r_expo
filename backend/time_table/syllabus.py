from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
from lxml import html
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from time_table.models import Kamoku


def syllabus (url):
    options = Options()
    options.add_argument("--headless")
    driver = webdriver.Chrome(options=options)

    driver.implicitly_wait(10)
    driver.maximize_window()
    
    driver.get(url)
    
    html_content = driver.page_source
    
    tree = html.fromstring(html_content)
    
    element = tree.xpath("/html/body/div[2]/div[2]/div/div/div[2]/div/div[2]")
    
    classroom = element[0].text_content()
    
    driver.close()
    
    return classroom
    
    