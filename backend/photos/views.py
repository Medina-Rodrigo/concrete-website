from django.shortcuts import render
from rest_framework import generics
from .models import Photo
from .serializers import PhotoSerializer


class PhotoListAPIView(generics.ListAPIView):
    queryset = Photo.objects.all().order_by("order", "-created_at")
    serializer_class = PhotoSerializer
    