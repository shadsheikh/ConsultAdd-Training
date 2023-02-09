from django.contrib import admin
 
# Register your models here.
from .models import *
from app.models import Employees

admin.site.register(Employees)
