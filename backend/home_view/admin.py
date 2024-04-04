from django.contrib import admin
from .models import Photo

class PhotoAdmin(admin.ModelAdmin):
    list_display = ('id','title', 'image', 'description', 'carousel_url')  # 一覧画面に表示するフィールドを指定
<<<<<<< HEAD
    search_fields = ('id','title', 'description')  # 検索フィールドを指定
=======
    search_fields = ('id','title', 'description', 'carousel_url')  # 検索フィールドを指定
>>>>>>> 048dd1db6db52c9f89b226f1efe1cf6739a6e4a0

admin.site.register(Photo, PhotoAdmin)
