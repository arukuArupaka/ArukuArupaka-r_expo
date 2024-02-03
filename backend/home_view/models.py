# photo/models.py

from django.db import models

class Photo(models.Model):
    title = models.CharField(max_length=255, default="Untitled")  # デフォルト値を追加
    image = models.ImageField(upload_to='photos/')
    description = models.TextField()

    def __str__(self):
        return self.image
    def __init__(self, *args, **kwargs):
        kwargs.pop('user', None)  # userフィールドを無視
        super(Photo, self).__init__(*args, **kwargs)
# Create your models here.
