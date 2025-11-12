from django.urls import path
from .views import PollListCreateView, VoteCreateView, PollResultView

urlpatterns = [
    path('polls/', PollListCreateView.as_view(), name='poll-list-create'),
    path('vote/', VoteCreateView.as_view(), name='vote-create'),
    path('polls/<int:pk>/results/', PollResultView.as_view(), name='poll-results'),
]
