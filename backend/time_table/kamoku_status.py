from openpyxl import load_workbook

def kamoku_status(num):
    workbook = load_workbook(filename="time_table\DepInfo\Department_of_Butsuri.xlsx")
    sheet = workbook["Sheet1"]
    
    status = None
    for row in range(1, sheet.max_row + 1):
        cell_value = sheet[f"G{row}"].value
        if cell_value and num in str(cell_value):
            status = sheet[f"C{row}"].value
            break
        
    return status