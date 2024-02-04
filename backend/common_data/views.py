from django.shortcuts import render
from rest_framework.decorators import api_view
#from serializers import RegisterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


@api_view(['GET'])
def helloworldfunc(request):
  person = {'name':'テスト', 'コードを書く場所':'home_viewのファイルの中は自由に変えてもらって大丈夫です。'}
  return Response(person)


# class RegisterView(APIView):
#     @staticmethod
#     def post(request, *args, **kwargs):
#         print(request.data)
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             # パスワードと確認パスワードが一致しない場合
#             if serializer.validated_data['password'] != request.data['password_confirmation']:
#                 return Response({'error': 2}, status=HTTP_400_BAD_REQUEST)

#             # UserIDがすでに使われていた場合
#             if User.objects.filter(user_id=serializer.validated_data['user_id']).exists():
#                 return Response({'error': 3}, status=HTTP_400_BAD_REQUEST)

#             # エラーなし
#             try:
#                 serializer.save()
#             except:
#                 # データベースエラー
#                 return Response({'error': 11}, status=HTTP_500_INTERNAL_SERVER_ERROR)

#             return Response(serializer.data, status=HTTP_201_CREATED)
#         return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
# # Create your views here.
