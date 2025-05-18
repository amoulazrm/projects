from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    title = models.CharField(max_length=200, verbose_name="Project Title")
    description = models.TextField(verbose_name="Project Description")
    image = models.URLField(blank=True, null=True, verbose_name="Project Image URL")  # Changed from ImageField to URLField
    url = models.URLField(blank=True, null=True, verbose_name="Project URL")
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects', verbose_name="User ")
    def __str__(self):
        return self.title
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Project"
        verbose_name_plural = "Projects"
class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks', verbose_name="Project")
    title = models.CharField(max_length=200, verbose_name="Task Title")
    description = models.TextField(blank=True, null=True, verbose_name="Task Description")
    completed = models.BooleanField(default=False, verbose_name="Is Completed")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date Created")
    def __str__(self):
        return self.title
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Task"
        verbose_name_plural = "Tasks"