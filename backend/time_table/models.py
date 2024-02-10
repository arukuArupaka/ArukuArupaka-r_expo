from django.db import models

# Create your models here.
class Kamoku(models.Model):
    kamokuid = models.IntegerField(primary_key=True)
    kamoku_num = models.IntegerField()
    kamoku_name = models.CharField(max_length=100)
    kamoku_class = models.CharField(max_length=100)
    kamoku_teacher = models.CharField(max_length=100)
    kamoku_resume = models.CharField(max_length=100)
    kamoku_day = models.CharField(max_length=100)
    kamoku_time = models.IntegerField()
    kamoku_department = models.CharField(max_length=100)
    kamoku_unit = models.IntegerField()
    kamoku_season = models.CharField(max_length=100)
    
    def __str__(self):
        return f'{self.kamoku_name} - {self.kamoku_class} - {self.kamoku_teacher} - {self.kamoku_resume} - {self.kamoku_day} - {self.kamoku_department} - {self.kamoku_season}'