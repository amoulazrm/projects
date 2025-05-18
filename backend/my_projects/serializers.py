from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Project

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

class ProjectSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'image', 'url', 'created_at', 'user']
        read_only_fields = ['id', 'created_at', 'user']