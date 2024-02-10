from .models import Kamoku

def class_in_database(kamokuid, classroom):
        kamoku2 = Kamoku.objects.get(kamokuid=kamokuid)
        
        kamoku2.kamoku_class = classroom
        
        kamoku2.save()
    