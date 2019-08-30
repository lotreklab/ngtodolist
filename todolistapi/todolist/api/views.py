from rest_framework import viewsets, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authtoken.models import Token

from todolist.api.models import Attivita
from todolist.api.serializers import AttivitaSerializer, UtenteSerializer
from django.contrib.auth.models import User


class AttivitaViewSet(viewsets.ModelViewSet):
    queryset = Attivita.objects.all()
    serializer_class = AttivitaSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status']

    def get_queryset(self):
        return Attivita.objects.filter(utente=self.request.user).order_by('-id')

    def perform_create(self, serializer):
        serializer.save(utente=self.request.user)

    @action(detail=False, methods=['get'])
    def get_counters(self, request):
        count_non_completate = Attivita.objects.filter(status='N', utente=self.request.user).count()
        count_completate = Attivita.objects.filter(status='C', utente=self.request.user).count()
        count_rimosse = Attivita.objects.filter(status='R', utente=self.request.user).count()
        return Response({
            'Non completate': count_non_completate,
            'Completate': count_completate,
            'Rimosse': count_rimosse
        })


class UtenteViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UtenteSerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['post']

    @action(detail=False, methods=['get'])
    def get_token(self, request):
        if request.user is None:
            return Response(status=403)
        token = Token.objects.get_or_create(user=request.user).key
        return Response({
            'Token': token
        })
