from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

from todolist.api.models import Attivita
from todolist.api.serializers import AttivitaSerializer, UtenteSerializer
from django.contrib.auth.models import User


class AttivitaViewSet(viewsets.ModelViewSet):
    queryset = Attivita.objects.all()
    serializer_class = AttivitaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Attivita.objects.filter(utente=self.request.user).order_by('-id')

    def perform_create(self, serializer):
        serializer.save(utente=self.request.user)


class UtenteViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UtenteSerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['post']


