from django.db import models

class Photo(models.Model):
    title = models.CharField(max_length=255, default="Untitled")
    image = models.ImageField(upload_to='photos/')
    description = models.TextField()

    def __str__(self):
        return self.title  # オブジェクトのタイトルを返すように修正
