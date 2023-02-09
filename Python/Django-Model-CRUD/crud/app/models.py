from django.db import models

class Employees(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField( max_length=100)
    address = models.TextField()
    phone = models.IntegerField()

    def __str__(self):
        return self.name

class Manager(models.Manager):
    id = models.IntegerField()
    name = models.CharField(max_length=200)
    manager = models.OneToOneField(Employees)
    
    def __str__(self):
        return self.name
