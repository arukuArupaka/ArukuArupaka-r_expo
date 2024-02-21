from django.contrib import admin
from .models import Vote

class VoteAdmin(admin.ModelAdmin):
    list_display = ('option', 'count')
    actions = ['reset_votes']

    def reset_votes(self, request, queryset):
        queryset.update(count=0)

    reset_votes.short_description = "投票結果をリセットする"

admin.site.register(Vote, VoteAdmin)

# Register your models here.
