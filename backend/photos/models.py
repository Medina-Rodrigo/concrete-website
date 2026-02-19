from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.

class Photo(models.Model):
    image = models.ImageField(upload_to="photos/") # Django will place uploaded files under a photos/ subfolder within my media storage
    