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
import re
from time_table.models import Kamoku
from .split import split
from .num_name import num_name
from .day_adjust import day_adjust
from .department_adjust import department_adjust
from .syllabus import syllabus
from .async_classroom import async_class
from asgiref.sync import sync_to_async
from .kamoku_in_database import kamoku_in_database
from selenium.common.exceptions import NoSuchElementException
from .in_database import class_in_database
from .day_time import day_time
from .change_sentence import change
from .kamoku_status import kamoku_status
from .clean_name import change_name

# Chromeオプションを設定する

async def web_search(url, select_season, select_time, select_day, select_department, class_name):
    end_loop_point = None
    end_loop_season = None
    end_loop_depart = None
    end_loop_point = None
    end_loop_day = None
    break_point = None
    break_point_day = None
    out_loop_point = None
    break_depart = None
    break_season = None
    options = webdriver.ChromeOptions()
    options.add_argument("disable-blink-features=AutomationControlled")

    # Chromeドライバのパスを指定（webdriver_managerを使用して自動管理）
    service = Service(ChromeDriverManager().install())

    # Chromeドライバを初期化
    driver = webdriver.Chrome(service=service, options=options)

    driver.implicitly_wait(10)
    driver.maximize_window()
    
    driver.get(url)
    
    #department_select = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[1]/td/select")
    #department_select.click()
    
    #department_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[1]/td/select/option[{select_department}]"
    #department = driver.find_element(by=By.XPATH, value=department_xpath)
    #department.click()
    
    page = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[3]/select")
    page.click()
                
    page_qty = driver.find_element(by=By.XPATH, value='/html/body/div[1]/div[2]/div/div/form/div/div[3]/select/option[3]')
    page_qty.click()
    
    start_point = 1
    qty = 0
    
    for d in range(2, 18):
        department_select = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[1]/td/select")
        department_select.click()
        
        department_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[1]/td/select/option[{d}]"
        department = driver.find_element(by=By.XPATH, value=department_xpath)
        department.click()
        
        for a in range (2):
            season_select = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[2]/td/select[2]")
            season_select.click()
            
            print(f'アウトループポイント：{ out_loop_point }')
            
            season_xpath = f"/html/body/div[1]/div[2]/div/div/form/div[1]/div[5]/table/tbody/tr[2]/td/select[2]/option[{int(select_season)+a}]"
            season = driver.find_element(by=By.XPATH, value=season_xpath)
            season.click()
            point = 0
            
            for b in range (5):
                for c in range (7):
                    koma_select = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/img")
                    koma_select.click()
                                
                    if c > 0:
                        koma_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[{int(select_time)+c-1}]/td[{int(select_day)+b}]"
                        select_koma = driver.find_element(by=By.XPATH, value=koma_xpath)
                        select_koma.click()
                        koma_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[{int(select_time)+c}]/td[{int(select_day)+b}]"
                        select_koma = driver.find_element(by=By.XPATH, value=koma_xpath)
                        select_koma.click()
                    elif c == 0 and b > 0:
                        if end_loop_point == 6:
                            koma_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[{int(select_time)+6}]/td[{int(select_day)+b-1}]"
                            select_koma = driver.find_element(by=By.XPATH, value=koma_xpath)
                            select_koma.click()
                            koma_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[{int(select_time)+c}]/td[{int(select_day)+b}]"
                            select_koma = driver.find_element(by=By.XPATH, value=koma_xpath)
                            select_koma.click()
                        else:
                            koma_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[{int(select_time)+break_point}]/td[{int(select_day)+b-1}]"
                            select_koma = driver.find_element(by=By.XPATH, value=koma_xpath)
                            select_koma.click()
                            koma_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[{int(select_time)+c}]/td[{int(select_day)+b}]"
                            select_koma = driver.find_element(by=By.XPATH, value=koma_xpath)
                            select_koma.click()
                    elif c == 0 and b == 0:
                        if  break_point_day == 4 and out_loop_point == 0 and break_depart == d:#同学部の春セメから秋セメの移動時に春セメの金曜で例外処理していた場合
                            koma_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[{int(select_time)+ break_point}]/td[{int(select_day)+4}]"
                            select_koma = driver.find_element(by=By.XPATH, value=koma_xpath)
                            select_koma.click()
                            koma_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[{int(select_time)+c}]/td[{int(select_day)+b}]"
                            select_koma = driver.find_element(by=By.XPATH, value=koma_xpath)
                            select_koma.click()
                        elif break_point_day == 4 and out_loop_point == 1 and break_depart == d-1 and break_season == 1:#次の学部の移動時に前学部の金曜に例外処理をしていた場合
                            koma_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[{int(select_time)+break_point}]/td[{int(select_day)+4}]"
                            select_koma = driver.find_element(by=By.XPATH, value=koma_xpath)
                            select_koma.click()
                            koma_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[{int(select_time)+c}]/td[{int(select_day)+b}]"
                            select_koma = driver.find_element(by=By.XPATH, value=koma_xpath)
                            select_koma.click()
                        elif break_point_day != 4 and end_loop_point == 6 and end_loop_day == 4 and end_loop_depart == d and out_loop_point == 0:#同学部の春セメから秋セメの移動時に春セメ金7限までしっかり実行されていた場合
                            koma_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[{int(select_time)+6}]/td[{int(select_day)+4}]"
                            select_koma = driver.find_element(by=By.XPATH, value=koma_xpath)
                            select_koma.click()
                            koma_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[{int(select_time)+c}]/td[{int(select_day)+b}]"
                            select_koma = driver.find_element(by=By.XPATH, value=koma_xpath)
                            select_koma.click()
                        elif break_point_day != 4 and end_loop_point == 6 and end_loop_day == 4 and end_loop_depart == d-1 and end_loop_season == 1 and out_loop_point == 1:#次の学部の移動時に前学部の金曜にしっかり7限まで実行されていた場合
                            koma_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[{int(select_time)+6}]/td[{int(select_day)+4}]"
                            select_koma = driver.find_element(by=By.XPATH, value=koma_xpath)
                            select_koma.click()
                            koma_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[{int(select_time)+c}]/td[{int(select_day)+b}]"
                            select_koma = driver.find_element(by=By.XPATH, value=koma_xpath)
                            select_koma.click()
                        elif a == 0 and b == 0 and c == 0 and d == 2:    
                            koma_xpath = f"/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[1]/table/tbody/tr[{int(select_time)+c}]/td[{int(select_day)+b}]"
                            select_koma = driver.find_element(by=By.XPATH, value=koma_xpath)
                            select_koma.click()
                
                    kettei = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[5]/table/tbody/tr[3]/td/div/div[3]/input")
                    kettei.click()
                    
                    try:
                        end_point = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div[2]/div[2]/span[1]")
                        print(f'b = { b }のループ')
                        print(f'c = { c }のループ')
                        
                    except NoSuchElementException:
                        print('ブレイク')
                        break_season = a
                        break_point = c
                        break_point_day = b
                        break_depart = d
                        print(f'ブレイクポイント={break_point}')
                        break
                    
                    #class_type = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[1]/input[1]")
                    #class_type.click()
                    
                    #class_type.send_keys(class_name)
                    
                    #class_submit = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[1]/input[3]")
                    #class_submit.click()
                    
                    
                    
                    #page = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div[2]/div/div/form/div/div[3]/select")
                    #page.click()
                    
                    #page_qty = driver.find_element(by=By.XPATH, value='/html/body/div[1]/div[2]/div/div/form/div/div[3]/select/option[3]')
                    #page_qty.click()
                    
                    html_content = driver.page_source
                    
                    tree = html.fromstring(html_content)
                    
                    page = tree.xpath("/html/body/div[1]/div[2]/div/div/form/div[2]/div[2]/span[1]")
                    
                    page_qty = page[0].text_content()
                    
                    page_all = re.sub(r"\D", "", page_qty)
                    
                    rem = int(page_all) % 50
                    
                    if rem > 0:
                        page_all_qty = (int(page_all)/50)+1
                    else:
                        page_all_qty = int(page_all)/50    
                    
                    for i in range(int(page_all_qty)):
                        urls = []
                        for j in range(2, 52):
                            html_content = driver.page_source
                            tree = html.fromstring(html_content)
                            xpath_kamoku = f"/html/body/div[1]/div[2]/div/div/form/table/tbody/tr[{j}]/td[2]/a"
                            xpath_season = f"/html/body/div[1]/div[2]/div/div/form/table/tbody/tr[{j}]/td[3]"
                            xpath_teacher = f"/html/body/div[1]/div[2]/div/div/form/table/tbody/tr[{j}]/td[6]"
                            xpath_unit = f"/html/body/div[1]/div[2]/div/div/form/table/tbody/tr[{j}]/td[8]"
                            xpath_daytime = f"/html/body/div[1]/div[2]/div/div/form/table/tbody/tr[{j}]/td[4]"
                            element_kamoku = tree.xpath(xpath_kamoku)
                            element_season = tree.xpath(xpath_season)
                            element_teacher = tree.xpath(xpath_teacher)
                            element_unit = tree.xpath(xpath_unit)
                            element_daytime = tree.xpath(xpath_daytime)
                            
                            if element_kamoku:
                                kamoku = element_kamoku[0].text_content()
                                resume = element_kamoku[0].get('href')
                                season = element_season[0].text_content()
                                teacher = element_teacher[0].text_content()
                                unit = element_unit[0].text_content()
                                ad_dep = department_adjust(d)
                                ka_daytime = day_time(element_daytime[0].text_content())
                                ad_day = day_adjust(b+1)
                                day = ka_daytime[1]
                                time = ka_daytime[0]
                                
                                kamoku_contain = '§' in kamoku
                                if kamoku_contain:
                                    values = kamoku.count('§')
                                    splited_kamoku = split(kamoku)
                                    for value in range(int(values)+1):
                                        re_kamoku = splited_kamoku[value]
                                        num_name_split = num_name(re_kamoku)
                                        num = num_name_split[0]
                                        name = num_name_split[1]
                                        cleaned_name = change_name(name)
                                        url = "https://ct.ritsumei.ac.jp"+resume
                                        urls.append(url)
                                        #classroom = syllabus(url)
                                        status = None
                                        await sync_to_async(kamoku_in_database)(int(num), cleaned_name, teacher, url, ad_day, c+1, ad_dep, int(unit), season, status)
                                else:
                                    num_name_split = num_name(kamoku)
                                    num = num_name_split[0]
                                    name = num_name_split[1]
                                    cleaned_name = change_name(name)
                                    url = "https://ct.ritsumei.ac.jp"+resume
                                    urls.append(url)
                                    #classroom = syllabus(url)
                                    status = None
                                    await sync_to_async(kamoku_in_database)(int(num), cleaned_name, teacher, url, ad_day, c+1, ad_dep, int(unit), season, status)
                                    
                        kamoku_qty = await sync_to_async(Kamoku.objects.all().count)()
                        
                        texts = await async_class(urls)
                        
                        print(f'start_point: {start_point}, qty: {qty}')
                        
                        qty = len(urls)
                        
                        for dbnum in range(int(start_point), int(qty)+start_point):
                            cleaned_data = await sync_to_async(change)(texts)
                            await sync_to_async(class_in_database)(dbnum, cleaned_data[dbnum-start_point])
                        
                        start_point = qty + start_point

                        page_num = 10*(i+1)+1
                        
                        if i == int(page_all_qty)-1:
                            break
                        javascript_code = f"""
                        var form = document.getElementById('syllabussearchform');
                        manaba.appendHidden(form,'start','{page_num}');  
                        form.submit();
                        """
                        driver.execute_script(javascript_code)
                    end_loop_season = a
                    end_loop_depart = d
                    end_loop_point = c
                    end_loop_day = b
                    
            out_loop_point = a
        
    driver.quit()
    
    
    