from django.urls import path
from . import views

urlpatterns = [
    path('api/get_text/', views.get_text, name='get_text'),
    path('api/submit/', views.submit_result, name='submit_result'),
]
