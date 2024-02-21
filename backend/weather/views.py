#views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Vote
from django.utils import timezone

@csrf_exempt
def get_votes(request):
    votes = Vote.objects.all()
    data = {vote.option: vote.count for vote in votes}
    return JsonResponse(data)

@csrf_exempt
def vote(request):
    if request.method == 'POST':
        option = request.POST.get('option')
        if option in ['sunny', 'cloudy', 'rainy', 'other']:
            vote = Vote.objects.get_or_create(option=option)[0]
            vote.count += 1
            vote.last_reset_date = timezone.now().date()  # 追加
            vote.save()
            return JsonResponse({'status': 'Success'})
    return JsonResponse({'status': 'Error'}, status=400)

