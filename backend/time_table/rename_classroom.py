from .models import Kamoku
import re
from asgiref.sync import sync_to_async

def get_kamoku_list():
    return list(Kamoku.objects.all())

async def rename_classroom():
    wrong_class = await sync_to_async(get_kamoku_list)()
    pattern = r"[\[\]']" # 変えたいところと内容をここで動的に変更可能
    for room in wrong_class:
        new_name = re.sub(pattern, '', room.kamoku_class) 
        await sync_to_async(Kamoku.objects.filter(kamoku_department=room.kamoku_department, kamoku_num=room.kamoku_num).update)(kamoku_class=new_name)
    print('終了しました')