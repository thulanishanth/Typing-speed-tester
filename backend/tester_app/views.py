from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
import json
import random
from .. import passages

def get_text(request):
    text = random.choice(passages.PASSAGES)
    request.session['current_text'] = text
    request.session['start_time'] = timezone.now().timestamp()
    return JsonResponse({'text': text})

@csrf_exempt
def submit_result(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        typed_text = data.get('typedText', '')
        end_time = timezone.now().timestamp()
        start_time = request.session.get('start_time')
        target_text = request.session.get('current_text')

        if not start_time or not target_text:
            return JsonResponse({'error': 'Session expired'}, status=400)

        time_taken = end_time - start_time
        time_in_minutes = time_taken / 60
        word_count = len(target_text.split())
        wpm = word_count / time_in_minutes

        correct_chars = sum(1 for i, c in enumerate(typed_text) if i < len(target_text) and c == target_text[i])
        accuracy = (correct_chars / len(target_text)) * 100

        attempts = request.session.get('attempts', [])
        attempts.append({'wpm': wpm})
        request.session['attempts'] = attempts
        avg_wpm = sum(a['wpm'] for a in attempts) / len(attempts)

        return JsonResponse({
            'timeTaken': f"{time_taken:.2f}",
            'wpm': f"{wpm:.2f}",
            'accuracy': f"{accuracy:.2f}",
            'averageWpm': f"{avg_wpm:.2f}"
        })
    return JsonResponse({'error': 'Invalid request'}, status=400)
