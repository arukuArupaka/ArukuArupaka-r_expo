from django.db import models

class Photo(models.Model):
    title = models.CharField(max_length=255, default="Untitled")
    image = models.ImageField(upload_to='photos/')
    description = models.TextField()
    carousel_url = models.URLField(default="")
<<<<<<< HEAD
=======
    
>>>>>>> 048dd1db6db52c9f89b226f1efe1cf6739a6e4a0

    def __str__(self):
        return self.title  # オブジェクトのタイトルを返すように修正
