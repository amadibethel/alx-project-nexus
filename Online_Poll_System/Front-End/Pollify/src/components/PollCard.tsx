import React from "react";
import { Poll } from "../types";
import { useNavigate } from "react-router-dom";

export default function PollCard({ poll }: { poll: Poll }) {
  const navigate = useNavigate();
  const totalVotes = poll.options.reduce((s, o) => s + o.votes, 0);
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">{poll.title}</h3>
      {poll.description && <p className="text-sm text-slate-500 mt-1">{poll.description}</p>}
      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-slate-600">{totalVotes} votes</div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/poll/${poll.id}`)}
            className="px-3 py-1 bg-primary text-white rounded-md text-sm"
          >
            Vote
          </button>
          <button
            onClick={() => navigate(`/poll/${poll.id}/results`)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            Results
          </button>
        </div>
      </div>
    </div>
  );
}
