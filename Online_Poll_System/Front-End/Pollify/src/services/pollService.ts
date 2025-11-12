/**
 * pollService
 * - Uses axios when REACT_APP_API_BASE is defined
 * - Otherwise uses a localStorage-backed mock store so you can run without a backend
 *
 * For real backend, set VITE_API_BASE in .env and ensure endpoints:
 * GET /polls
 * GET /polls/:id
 * POST /polls
 * POST /polls/:id/vote { optionId }
 */

import axios from "axios";
import { Poll, PollOption } from "../types";
import { v4 as uuidv4 } from "uuid";

const API_BASE = import.meta.env.VITE_API_BASE as string | undefined;

const axiosInstance = axios.create({
  baseURL: API_BASE || undefined,
  timeout: 5000
});

const MOCK_KEY = "pollify_mock_polls_v1";

/* Mock helpers */
function loadMockPolls(): Poll[] {
  const raw = localStorage.getItem(MOCK_KEY);
  if (!raw) {
    const starter: Poll[] = [
      {
        id: uuidv4(),
        title: "Which frontend framework do you prefer?",
        description: "Choose your most loved frontend framework.",
        options: [
          { id: uuidv4(), text: "React", votes: 12 },
          { id: uuidv4(), text: "Vue", votes: 6 },
          { id: uuidv4(), text: "Svelte", votes: 3 }
        ],
        createdAt: new Date().toISOString(),
        createdBy: "system"
      }
    ];
    localStorage.setItem(MOCK_KEY, JSON.stringify(starter));
    return starter;
  }
  try {
    return JSON.parse(raw) as Poll[];
  } catch (e) {
    localStorage.removeItem(MOCK_KEY);
    return loadMockPolls();
  }
}

function saveMockPolls(polls: Poll[]) {
  localStorage.setItem(MOCK_KEY, JSON.stringify(polls));
}

/* Service */
const pollService = {
  async getPolls(): Promise<Poll[]> {
    if (API_BASE) {
      const res = await axiosInstance.get<Poll[]>("/polls");
      return res.data;
    } else {
      // mock
      return new Promise((res) => setTimeout(() => res(loadMockPolls()), 400));
    }
  },

  async getPoll(id: string): Promise<Poll | null> {
    if (API_BASE) {
      const res = await axiosInstance.get<Poll>(`/polls/${id}`);
      return res.data;
    } else {
      const polls = loadMockPolls();
      const p = polls.find((x) => x.id === id) || null;
      return new Promise((r) => setTimeout(() => r(p), 300));
    }
  },

  async createPoll(payload: Partial<Poll>): Promise<Poll> {
    if (API_BASE) {
      const res = await axiosInstance.post<Poll>("/polls", payload);
      return res.data;
    } else {
      const polls = loadMockPolls();
      const newPoll: Poll = {
        id: uuidv4(),
        title: payload.title || "Untitled Poll",
        description: payload.description || "",
        options:
          payload.options?.map((o) =>
            typeof o === "object" ? ({ id: uuidv4(), text: (o as PollOption).text, votes: 0 } as PollOption) : ({ id: uuidv4(), text: String(o), votes: 0 } as PollOption)
          ) ||
          [],
        createdAt: new Date().toISOString(),
        createdBy: payload.createdBy || "anonymous"
      };
      polls.unshift(newPoll);
      saveMockPolls(polls);
      return new Promise((r) => setTimeout(() => r(newPoll), 300));
    }
  },

  async vote(pollId: string, optionId: string): Promise<Poll | null> {
    if (API_BASE) {
      const res = await axiosInstance.post<Poll>(`/polls/${pollId}/vote`, { optionId });
      return res.data;
    } else {
      const polls = loadMockPolls();
      const poll = polls.find((p) => p.id === pollId);
      if (!poll) return null;
      const option = poll.options.find((o) => o.id === optionId);
      if (!option) return null;
      option.votes += 1;
      saveMockPolls(polls);
      return new Promise((r) => setTimeout(() => r({ ...poll }), 300));
    }
  }
};

export default pollService;
