import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchPolls } from "../features/polls/pollsSlice";
import PollCard from "./PollCard";

export default function PollList() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.polls.items);
  const status = useAppSelector((s) => s.polls.status);

  useEffect(() => {
    dispatch(fetchPolls());
    // optional: poll every 8s for live-ish updates (mock)
    const id = setInterval(() => dispatch(fetchPolls()), 8000);
    return () => clearInterval(id);
  }, [dispatch]);

  if (status === "loading") return <div>Loading polls...</div>;
  if (!items.length) return <div>No active polls yet. Create the first poll!</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <PollCard key={p.id} poll={p} />
      ))}
    </div>
  );
}
