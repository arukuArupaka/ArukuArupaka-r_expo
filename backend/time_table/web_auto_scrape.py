from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

def web_auto(url):
    # WebDriverのパスを指定
    driver = webdriver.Chrome()

    driver.get(url)

    # IDとパスワード入力欄を見つける
    select = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/img")  # 'id_name'は実際のHTMLの入力欄のname属性に合わせてください
    select.click()
    
    koma = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[2]/td[1]")
    koma.click()
    
    kettei = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[3]/input")
    kettei.click()
    
    time.sleep(5)
    
    driver.quit()
