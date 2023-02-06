from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from djangoApi.models import Person
from djangoApi.serializers import personSerializers


@api_view(['GET'])
def index(self):
    return HttpResponse("Home Page")

class PersonList(APIView):
    def post(self,request):
        print("DATA---------------------",request.data)
        name = request.data["name"]
        salary = request.data["sal"]
        id = request.data["id"]
        p = Person(name=name,sal=salary,id=id)
        p.save()
        return HttpResponse("data posted succesfully")

    def get(self,request):
        print("DATA1111---------------------", request.data)
        if request.data['id']:
            print(f"if part {request.data['id']}")

            idd=request.data['id']
            P =Person.objects.filter(id=idd)
            if P:
                print(P)
                p1 = Person.objects.get(id=idd)
                s = personSerializers(p1)
                print(s)
                return Response(s.data)

            else :
                print("else part")
                p = Person.objects.all()
                s = personSerializers(p, many=True)
                return Response(s.data)


    def put(self,request):
        print(request.data['id'])
        idd = request.data['id']
        name = request.data['name']
        P = Person.objects.get(id=idd)
        P.name=name
        P.save()
        return HttpResponse("Record Updated")

    def delete(self,request):
        idd = request.data['id']
        instance = Person.objects.filter(id=idd)
        instance.delete()
        return HttpResponse("Record Deleted")




