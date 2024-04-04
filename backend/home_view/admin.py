from django.contrib import admin
from .models import Photo

class PhotoAdmin(admin.ModelAdmin):
    list_display = ('id','title', 'image', 'description', 'carousel_url')  # 一覧画面に表示するフィールドを指定
    search_fields = ('id','title', 'description', 'carousel_url')  # 検索フィールドを指定

admin.site.register(Photo, PhotoAdmin)
