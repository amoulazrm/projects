from .views import register_user

urlpatterns = [
    # ...
    path('api/register/', register_user, name='register'),
    # ...
]