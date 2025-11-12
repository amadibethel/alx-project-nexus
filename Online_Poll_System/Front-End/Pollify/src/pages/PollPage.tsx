import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchPoll, voteOnPoll } from "../features/polls/pollsSlice";
import { Poll } from "../types";

export default function PollPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const poll = useAppSelector((s) => s.polls.items.find((p) => p.id === id));
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchPoll(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (poll && poll.options.length && !selected) {
      setSelected(poll.options[0].id);
    }
  }, [poll]);

  const handleVote = async () => {
    if (!id || !selected) return;
    setLoading(true);
    try {
      await dispatch(voteOnPoll({ pollId: id, optionId: selected })).unwrap();
      navigate(`/poll/${id}/results`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!poll) return <div>Loading poll...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold">{poll.title}</h1>
      {poll.description && <p className="text-sm text-slate-600 mt-1">{poll.description}</p>}

      <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
        <form>
          <div className="space-y-3">
            {poll.options.map((o) => (
              <label key={o.id} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="option"
                  checked={selected === o.id}
                  onChange={() => setSelected(o.id)}
                />
                <div>
                  <div className="font-medium">{o.text}</div>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={handleVote}
              className="px-4 py-2 bg-primary text-white rounded"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Vote"}
            </button>
            <button type="button" className="px-4 py-2 border rounded" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
