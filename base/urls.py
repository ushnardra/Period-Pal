from django.urls import path
from . import views

urlpatterns = [
    path('', views.details, name='details'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('query/', views.query, name='query'),
    path('card/', views.card, name='card'),
]