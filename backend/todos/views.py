from rest_framework import viewsets, filters
from .models import Todo
from .serializers import TodoSerializer
from django_filters.rest_framework import DjangoFilterBackend


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["completed", "due_date", "priority"]
    search_fields = ["title", "description"]
