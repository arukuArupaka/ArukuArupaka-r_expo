import os
from django.core.management import call_command

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "arukuarupaka.settings")
# 上記の "your_project_name.settings" は、実際のプロジェクトの設定モジュール名に置き換えてください。

def dump_data():
    with open('data.json', 'w', encoding='utf-8') as f:
        call_command('dumpdata', 'time_table', stdout=f)

if __name__ == '__main__':
    import django
    django.setup()
    dump_data()
