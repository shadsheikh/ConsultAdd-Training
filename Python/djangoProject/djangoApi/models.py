from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=40)
    sal = models.IntegerField()
    id = models.IntegerField(primary_key=True)
