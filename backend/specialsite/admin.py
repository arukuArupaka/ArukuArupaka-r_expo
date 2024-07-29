
from django.contrib import admin
from .models import Special

class SpecialAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'page_name', 'icon_image', 'frame_color', 'destination_url')
    search_fields = ('id', 'title', 'page_name', 'destination_url')


admin.site.register(Special, SpecialAdmin)
