from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def TodoHome(request):
	return JsonResponse('Testing API',safe=False)