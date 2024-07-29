#models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Vote(models.Model):
    option_choices = [
        ('sunny', '晴れ'),
        ('cloudy', 'くもり'),
        ('rainy', '雨'),
        ('other', 'その他')
    ]
    option = models.CharField(max_length=10, choices=option_choices)
    count = models.PositiveIntegerField(default=0)
    last_reset_date = models.DateField(default=timezone.now)   # 追加

    def __str__(self):
        return f'{self.option}: {self.count}'

class VoteRecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    option = models.CharField(max_length=10, choices=Vote.option_choices)
    voted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} voted for {self.option} at {self.voted_at}'