import re

def change (data):
# スクレイピングで得られたリスト

    # 不要な文字を除去
    cleaned_data = [re.sub(r'[\n\u3000 [2024 春セメスター][2024 秋セメスター]]', '', item) for item in data]
    
    return cleaned_data

