import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'arukuarupaka.settings')
django.setup()

from django.core.management import call_command

with open('data.json', 'w', encoding='utf-8') as f:
    call_command('dumpdata', 'time_table', stdout=f)
