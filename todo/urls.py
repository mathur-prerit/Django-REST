from django.urls import path
from . import views

urlpatterns = [
path('',views.TodoHome,name='todo-home'),
]