import React, { useState } from "react";
import type { Poll } from "../types";

interface Props {
  onCreate: (payload: Partial<Poll>) => Promise<void>;
}

export default function PollForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addOption = () => setOptions((s) => [...s, ""]);
  const removeOption = (index: number) => setOptions((s) => s.filter((_, i) => i !== index));
  const updateOption = (index: number, value: string) =>
    setOptions((s) => s.map((o, i) => (i === index ? value : o)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) return setError("Title required");
    const cleaned = options.map((o) => o.trim()).filter((o) => o);
    if (cleaned.length < 2) return setError("At least two options are required");
    setLoading(true);
    try {
      await onCreate({
        title,
        description,
        options: cleaned.map((t) => ({ id: "", text: t, votes: 0 }))
      } as Partial<Poll>);
      setTitle("");
      setDescription("");
      setOptions(["", ""]);
    } catch (err: any) {
      setError(err?.message || "Failed to create poll");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
      <label className="block mb-3">
        <div className="text-sm font-medium mb-1">Title</div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="e.g. Which is the best JS framework?"
        />
      </label>

      <label className="block mb-3">
        <div className="text-sm font-medium mb-1">Description (optional)</div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
      </label>

      <div className="mb-3">
        <div className="text-sm font-medium mb-2">Options</div>
        <div className="space-y-2">
          {options.map((opt, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                value={opt}
                onChange={(e) => updateOption(i, e.target.value)}
                className="flex-1 border rounded px-3 py-2"
                placeholder={`Option ${i + 1}`}
              />
              {options.length > 2 && (
                <button type="button" onClick={() => removeOption(i)} className="text-red-500">
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button type="button" onClick={addOption} className="mt-2 text-sm text-primary">
          + Add option
        </button>
      </div>

      {error && <div className="text-red-500 mb-3">{error}</div>}

      <div className="flex gap-3">
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Creating..." : "Create Poll"}
        </button>
      </div>
    </form>
  );
}
