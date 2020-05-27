from django.urls import path
from . import views

urlpatterns = [
path('',views.TodoHome,name='todo-home'),
path('list/',views.TodoList,name='todo-list'),
path('list/<int:pk>/',views.TodoDetails,name='todo-details'),
path('new/',views.TodoCreate,name='todo-create'),
path('update/<int:pk>/',views.TodoUpdate,name='todo-update'),
path('delete/<int:pk>/',views.TodoDelete,name='todo-delete'),
]