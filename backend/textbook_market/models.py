from django.db import models
import uuid

class BookMarketList(models.Model):
  id=models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  textbook_name = models.CharField(max_length=50)
  depertment=models.CharField(max_length=50)
  grade=models.IntegerField()
  all_grade=models.BooleanField(help_text='一般教養ならTrue')
  author=models.CharField(max_length=50)
  exhibitor = models.CharField(max_length=50)
  image = models.ImageField(upload_to='book_image',null=True)
  date = models.DateTimeField(auto_now_add=True)

# Create your models here.
