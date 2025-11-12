from rest_framework import generics, status
from rest_framework.response import Response
from django.db.models import Count
from .models import Poll, Option, Vote
from .serializers import PollSerializer, VoteSerializer

class PollListCreateView(generics.ListCreateAPIView):
    queryset = Poll.objects.all().prefetch_related('options')
    serializer_class = PollSerializer


class VoteCreateView(generics.CreateAPIView):
    serializer_class = VoteSerializer

    def create(self, request, *args, **kwargs):
        option_id = request.data.get('option')
        voter_ip = request.META.get('REMOTE_ADDR')

        if Vote.objects.filter(option_id=option_id, voter_ip=voter_ip).exists():
            return Response({"error": "You have already voted!"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data={'option': option_id, 'voter_ip': voter_ip})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PollResultView(generics.RetrieveAPIView):
    serializer_class = PollSerializer
    queryset = Poll.objects.all()

    def retrieve(self, request, *args, **kwargs):
        poll = self.get_object()
        options = poll.options.annotate(votes=Count('votes'))
        data = {
            "poll": poll.question,
            "results": [{o.text: o.votes} for o in options]
        }
        return Response(data)
