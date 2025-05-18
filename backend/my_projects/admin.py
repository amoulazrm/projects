from django.contrib import admin
from .models import Project, Task
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user', 'created_at')
    search_fields = ('title', 'user__username')
    list_filter = ('created_at',)
@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'project', 'completed', 'created_at')
    list_filter = ('completed',)
    search_fields = ('title',)
