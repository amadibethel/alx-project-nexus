import React from "react";
import { Poll } from "../types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function ResultChart({ poll }: { poll: Poll }) {
  const total = poll.options.reduce((s, o) => s + o.votes, 0) || 1;
  const data = poll.options.map((o) => ({ name: o.text, votes: o.votes, percent: Math.round((o.votes / total) * 100) }));

  const colors = ["#2563EB", "#FACC15", "#10B981", "#EF4444", "#8B5CF6"];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h4 className="text-lg font-medium mb-3">Results</h4>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={150} />
          <Tooltip formatter={(value: number) => `${value} votes`} />
          <Bar dataKey="votes" barSize={18}>
            {data.map((_, idx) => (
              <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-2">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center justify-between text-sm">
            <div className="truncate max-w-xs">{d.name}</div>
            <div className="text-slate-600">{d.votes} votes • {d.percent}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
