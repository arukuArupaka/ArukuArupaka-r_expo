import re

def change (data):
# スクレイピングで得られたリスト

    # 不要な文字を除去
    cleaned_data = [re.sub(r'[\n\u3000 ]', '', item) for item in data]
    
    return cleaned_data

