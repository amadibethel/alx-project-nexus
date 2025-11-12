import React from "react";
import PollList from "../components/PollList";

export default function HomePage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Active Polls</h1>
          <p className="text-sm text-slate-500">Vote and see live results</p>
        </div>
      </div>
      <PollList />
    </div>
  );
}
