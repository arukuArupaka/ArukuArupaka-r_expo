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

def web_auto(url, element_text, select_season, select_time, select_day, select_department):
    options = Options()
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36")

    service = Service(executable_path="C:\chromedriver-win64\chromedriver.exe")
# オプションを使用してChromeドライバを起動
    driver = webdriver.Chrome(options=options, service=service)

    driver.implicitly_wait(10)
    driver.maximize_window()
    
    driver.get(url)
    
    department_select = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[1]/td/select")
    department_select.click()
    
    department_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[1]/td/select/option[{select_department}]"
    department = driver.find_element(by=By.XPATH, value=department_xpath)
    department.click()

    season_select = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[2]/td/select[2]")
    season_select.click()
    
    season_xpath = f"/html/body/div[1]/div[2]/div/div/form/div[1]/div[5]/table/tbody/tr[2]/td/select[2]/option[{select_season}]"
    season = driver.find_element(by=By.XPATH, value=season_xpath)
    season.click()
    
    koma_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[{select_time}]/td[{select_day}]"
    select_koma = driver.find_element(by=By.XPATH, value=koma_xpath)
    select_koma.click()
    
    koma = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[2]/td[1]")
    koma.click()
    
    kettei = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[3]/input")
    kettei.click()
    
    html_content = driver.page_source
    
    tree = html.fromstring(html_content)
    
    page = tree.xpath("/html/body/div[1]/div[2]/div/div/form/div[2]/div[2]/a[3]")
    
    page_qty = page[0].text_content()
    
    for j in range(1,int(page_qty)+1):
        for i in range(2,11):
            element_xpath = f"/html/body/div[1]/div[2]/div/div/form/table/tbody/tr[{i}]/td[2]/a"
            element = tree.xpath(element_xpath)
            if element:
                element_text.append(element[0].text_content())
            
            time.sleep(3)
            
        if j < 2:
            next_xpath = f"/html/body/div[1]/div[2]/div/div/form/div[2]/div[2]/a[4]"
            next = driver.find_element(by=By.XPATH, value=next_xpath)
            next.click()
        elif 1 < j < 4:
            next_xpath = f"/html/body/div[1]/div[2]/div/div/form/div[2]/div[2]/a[{j+4}]"
            next = driver.find_element(by=By.XPATH, value=next_xpath)
            next.click()
        elif 3 < j < page_qty-2:
            next_xpath = f"/html/body/div[1]/div[2]/div/div/form/div[2]/div[2]/a[8]"
            next = driver.find_element(by=By.XPATH, value=next_xpath)
            next.click()
        elif page_qty-3 < j < page_qty:
            next_xpath = f"/html/body/div[1]/div[2]/div/div/form/div[2]/div[2]/a[{(page_qty-j)+5}]"
            next = driver.find_element(by=By.XPATH, value=next_xpath)
            next.click()
        
    driver.quit()
                
    return element_text

