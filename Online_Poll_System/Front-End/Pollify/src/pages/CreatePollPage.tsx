import React from "react";
import PollForm from "../components/PollForm";
import { useAppDispatch } from "../hooks";
import { createPoll } from "../features/polls/pollsSlice";

export default function CreatePollPage() {
  const dispatch = useAppDispatch();

  const handleCreate = async (payload: any) => {
    // payload.options contains minimal option objects (id empty); pollsSlice will handle creation
    await dispatch(createPoll(payload)).unwrap();
    // optionally navigate to home or newly created poll id if available
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create a new poll</h1>
      <PollForm onCreate={handleCreate} />
    </div>
  );
}
