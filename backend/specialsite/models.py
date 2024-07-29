from django.db import models

class Special(models.Model):
    title = models.CharField(max_length=255, default="")
    page_name = models.CharField(max_length=255, default="")
    icon_image = models.ImageField(upload_to='special/icons/')
    frame_color = models.CharField(max_length=7, default="#000000")
    destination_url = models.URLField(default="")

    def __str__(self):
        return self.title
