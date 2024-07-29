import re

def change_name (data):
# スクレイピングで得られたリスト

    # 両方のパターンを含む正規表現パターン
    pattern = r"\[2024 秋セメスター\]|\[2024 春セメスター\]"
    # 指定したパターンを空文字列に置換
    clean_text = re.sub(pattern, "", data)

    return clean_text