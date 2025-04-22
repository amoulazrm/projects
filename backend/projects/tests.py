from django.test import TestCase
from .models import Project, Task
from datetime import date

class ProjectModelTest(TestCase):
    def test_create_project(self):
        project = Project.objects.create(
            name='Test Project',
            description='Test description',
            start_date=date.today(),
            status='Not Started'
        )
        self.assertEqual(str(project), 'Test Project')

class TaskModelTest(TestCase):
    def test_create_task(self):
        project = Project.objects.create(
            name='Test Project',
            description='Test description',
            start_date=date.today(),
            status='Not Started'
        )
        task = Task.objects.create(
            project=project,
            title='Test Task',
            description='Task details',
            due_date=date.today()
        )
        self.assertEqual(str(task), 'Test Task')
