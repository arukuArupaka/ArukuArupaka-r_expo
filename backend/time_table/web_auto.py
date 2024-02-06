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

def web_search(url, select_season, select_time, select_day, select_department, class_name):
    driver = webdriver.Chrome()

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
    
    koma_select = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/img")
    koma_select.click()
    
    koma_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[{select_time}]/td[{select_day}]"
    select_koma = driver.find_element(by=By.XPATH, value=koma_xpath)
    select_koma.click()
    
    kettei = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[3]/input")
    kettei.click()
    
    class_type = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[1]/input[1]")
    class_type.click()
    
    class_type.send_keys(class_name)
    
    class_submit = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[1]/input[3]")
    class_submit.click()
    
    page = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[3]/select")
    page.click()
    
    page_qty = driver.find_element(by=By.XPATH, value='/html/body/div[1]/div[2]/div/div/form/div/div[3]/select/option[3]')
    page_qty.click()
    
    element_texts = []
            
    html_content = driver.page_source
    
    tree = html.fromstring(html_content)
    
    driver.quit()
    
    for i in range(2, 51):
    # フォーマット済み文字列リテラルを使って動的にXPath式を生成
        xpath_expression = f"/html/body/div[1]/div[2]/div/div/form/table/tbody/tr[{i}]/td[2]/a"
        element = tree.xpath(xpath_expression)
    
        # 要素が存在する場合、そのテキストをリストに追加
        if element:
            element_texts.append(element[0].text_content())
    
    return element_texts
    
    
    