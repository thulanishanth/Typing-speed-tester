from django.urls import path
from . import views

# urlpatterns = [
#     path('', views.home, name='home'),  # ✅ root
#     path('api/get_text/', views.get_text, name='get_text'),
#     path('api/submit/', views.submit_result, name='submit_result'),
# ]

urlpatterns = [
    # path('', views.home, name='home'),  # change '' to 'test-home/'
    path('test-home/', views.home, name='home'),
    path('api/get_text/', views.get_text, name='get_text'),
    path('api/submit/', views.submit_result, name='submit_result'),
]

