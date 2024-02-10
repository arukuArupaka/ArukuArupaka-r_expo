from .models import Kamoku

def kamoku_in_database(num, name, teacher, url, ad_day, select_time, ad_dep, unit, season):
    kamoku = Kamoku(
        kamoku_num=num,
        kamoku_name=name,
        kamoku_teacher=teacher,
        kamoku_resume=url,
        kamoku_day=ad_day,
        kamoku_time=select_time,
        kamoku_department=ad_dep,
        kamoku_unit=unit,
        kamoku_season=season
    )
    kamoku.save()
