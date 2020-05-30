from django.shortcuts import render,redirect
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer

from .models import Task
# Create your views here.
@api_view(['GET'])
def TodoHome(request):
	api_urls={
	'List':'/list/',
	'Detail':'/list/<int:pk>/',
	'Create':'/new/',
	'Update':'/update/<int:pk>/',
	'Delete':'/delete/<int:pk>/',
	}

	# return JsonResponse(api_urls)
	return Response(api_urls)

@api_view(['GET'])
def TodoList(request):
	tasks=Task.objects.all()
	serializer = TaskSerializer(tasks,many=True)
	return Response(serializer.data)

@api_view(['GET'])
def TodoDetails(request,pk):
	tasks=Task.objects.get(id=pk)
	serializer = TaskSerializer(tasks,many=False)
	return Response(serializer.data)

@api_view(['POST'])
def TodoCreate(request):
	serializer=TaskSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

@api_view(['PUT'])
def TodoUpdate(request,pk):
	task=Task.objects.get(id=pk)
	print(pk)
	print('------------------------------------->',task)
	serializer=TaskSerializer(instance=task,data=request.data)
	print('!!!!!!!!!!!!!!!!!!!!-->',request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

@api_view(['DELETE'])
def TodoDelete(request,pk):
	task=Task.objects.get(id=pk)
	task.delete()
	return Response('Item deleted')