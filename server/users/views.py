from django.http.response import JsonResponse
from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('first_name')
    serializer_class = UserSerializer


def verify(request):
    if request.user.is_authenticated():
        return JsonResponse({'success': True,'user': UserSerializer(request.user).data})
    else:
        return JsonResponse({'success': False})


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }