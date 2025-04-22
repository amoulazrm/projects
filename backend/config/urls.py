from django.contrib import admin
from django.urls import path, include
from projects.views import home  # importer la vue d'accueil

urlpatterns = [
  path('admin/', admin.site.urls),
    path('', include('projects.urls')),
]
