from django.shortcuts import render
from .models import Project

def home(request):
    return render(request, 'home.html')

def projects(request):
    # Get all projects 
    all_projects = Project.objects.all()

    # Pass project data to template and render project
    return render(request, 'projects.html', {'projects': all_projects})
