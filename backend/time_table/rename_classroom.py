from .models import Kamoku
import re
from asgiref.sync import sync_to_async

async def rename_classroom():
    wrong_class = await sync_to_async(Kamoku.objects.filter(kamoku_class__contains="号教室"))
    for room in wrong_class:
        new_name = [re.sub(r'号教室', '', room.kamoku_class)]
        await sync_to_async(Kamoku.objects.filter(kamoku_department=room.kamoku_department, kamoku_num=room.kamoku_num).update)(kamoku_class=new_name)
    print('終了しました')
