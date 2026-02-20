from django.urls import path
from .views import PhotoListAPIView


urlpatterns = [
    path("photos/", PhotoListAPIView.as_view(), name="photo-list"),
    
]