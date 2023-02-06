from rest_framework import serializers
from djangoApi.models import Person


class personSerializers(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields ='__all__'
