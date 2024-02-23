from django.db import models

class Photo(models.Model):
    title = models.CharField(max_length=255, default="")
    image = models.ImageField(upload_to='special/')
    description = models.TextField()

    def __str__(self):
        return self.title  # オブジェクトのタイトルを返すように修正
