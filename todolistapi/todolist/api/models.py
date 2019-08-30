from django.db import models
from django.conf import settings

class Attivita(models.Model):
    utente = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    titolo = models.CharField(max_length=128)
    descrizione = models.TextField()
