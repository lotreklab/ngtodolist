from rest_framework import serializers

from todolist.api.models import Attivita
from django.contrib.auth.models import User



class AttivitaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Attivita
        fields = ['id', 'titolo', 'descrizione', 'utente', 'status']
        read_only_fields = ['utente']

class UtenteSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'password']