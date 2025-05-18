from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, register_user, current_user, test_api

router = DefaultRouter()
router.register(r'project', ProjectViewSet, basename='project')

urlpatterns = [
    path('', include(router.urls)),  # Include the router URLs for the ProjectViewSet
    path('register/', register_user, name='register'),
    path('user/', current_user, name='current_user'),
    path('test/', test_api, name='test_api'),
]
