from django.urls import path,include
from .views import GetAllBookList,GetHomeBookList,GetSearchBookList,GetBookDetail,AddSearchBookList,DestoryBookList,UpdateBookList,Test
from rest_framework.urlpatterns import format_suffix_patterns




urlpatterns = [
  #path('get_all/',include(get_all_list_router.urls)),
  path('get/all',GetAllBookList.as_view()),
  path('get/home_list',GetHomeBookList.as_view(),),
  path('get/search_list/',GetSearchBookList.as_view()),
  path('get/book_detail/<str:id>',GetBookDetail.as_view()),
  path('test/<str:textbook_name>/',Test.as_view()),
  path('add/book_list',AddSearchBookList.as_view()),
  path('remove/book_list_by_id/<str:id>',DestoryBookList.as_view()),
  path('update/book_list_by_id/<str:id>',UpdateBookList.as_view()),

]
