from django.db import models
from django.utils import timezone

class Poll(models.Model):
    question = models.CharField(max_length=255)
    created_at = models.DateTimeField(default=timezone.now)
    expires_at = models.DateTimeField()

    def __str__(self):
        return self.question


class Option(models.Model):
    poll = models.ForeignKey(Poll, related_name='options', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text


class Vote(models.Model):
    option = models.ForeignKey(Option, related_name='votes', on_delete=models.CASCADE)
    voter_ip = models.GenericIPAddressField()
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('option', 'voter_ip')
