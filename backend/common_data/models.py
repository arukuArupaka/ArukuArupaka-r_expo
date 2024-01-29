from django.db import models
import uuid

class CommonUserData(models.Model):
    user_id=models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_name=models.CharField(max_legth=20)
    password = models.CharField(max_length=20)

    def __str__(self):
        return self.user_id
# Create your models here.
