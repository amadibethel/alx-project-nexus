import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchPoll } from "../features/polls/pollsSlice";
import ResultChart from "../components/ResultChart";

export default function ResultsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const poll = useAppSelector((s) => s.polls.items.find((p) => p.id === id));

  useEffect(() => {
    if (id) dispatch(fetchPoll(id));
    // poll for updates to simulate live results
    const iv = setInterval(() => {
      if (id) dispatch(fetchPoll(id));
    }, 5000);
    return () => clearInterval(iv);
  }, [dispatch, id]);

  if (!poll) return <div>Loading results...</div>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold">{poll.title}</h1>
      <p className="text-sm text-slate-500 mt-1">{poll.description}</p>
      <div className="mt-6">
        <ResultChart poll={poll} />
      </div>
    </div>
  );
}
