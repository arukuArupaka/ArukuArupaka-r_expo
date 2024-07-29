from openpyxl import load_workbook
from time_table.models import Kamoku
from asgiref.sync import sync_to_async
from .department_adjust import department_adjust


async def kamoku_status(department):
    print('ハッシュ開始')
    print(department)
    workbook = load_workbook(filename="time_table\DepInfo\Department_of_Butsuri.xlsx")
    sheet = workbook["Sheet1"]

    # C列とG列の値を収集
    c_values = [cell.value for cell in sheet['C'] if cell.value is not None]
    g_values = [cell.value for cell in sheet['G'] if cell.value is not None]
    
    # c_valuesとg_valuesを使ってハッシュテーブルを作成
    hash_table = {g_value: c_value for c_value, g_value in zip(c_values, g_values)}
    
    print('ハッシュテーブル完成')
    
    dep = department_adjust(int(department))
    
    for element in hash_table:
        # print('merge実行')
        # print(hash_table[element])
        await sync_to_async(Kamoku.objects.filter(kamoku_department=dep, kamoku_num=element).update)(kamoku_status=hash_table[element])

