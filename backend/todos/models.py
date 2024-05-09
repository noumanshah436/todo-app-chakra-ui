from django.db import models


class Todo(models.Model):
    PRIORITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
    ]

    title = models.CharField(max_length=100, db_index=True)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(db_index=True)
    priority = models.CharField(
        max_length=6, choices=PRIORITY_CHOICES, default="medium", db_index=True
    )

    def __str__(self):
        return self.title
