# myapp/management/commands/reset_votes.py
from django.core.management.base import BaseCommand
from weather.models import Vote

class Command(BaseCommand):
    help = 'Resets all vote counts to 0'

    def handle(self, *args, **kwargs):
        try:
            Vote.objects.all().update(count=0)
            self.stdout.write(self.style.SUCCESS('Successfully reset all vote counts to 0'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error resetting vote counts: {e}'))
