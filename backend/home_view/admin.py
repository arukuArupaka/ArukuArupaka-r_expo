from django.contrib import admin
from .models import Photo

class PhotoAdmin(admin.ModelAdmin):
    list_display = ('title', 'image', 'description')  # 一覧画面に表示するフィールドを指定
    search_fields = ('title', 'description')  # 検索フィールドを指定

admin.site.register(Photo, PhotoAdmin)
