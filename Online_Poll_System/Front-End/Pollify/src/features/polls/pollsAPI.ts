// Thin abstraction; used by the slice. We delegate actual network/local logic to pollService.
import pollService from "../../services/pollService";
import type { Poll } from "../../types";

export const fetchPollsAPI = async (): Promise<Poll[]> => {
  return pollService.getPolls();
};

export const getPollByIdAPI = async (id: string): Promise<Poll | null> => {
  return pollService.getPoll(id);
};

export const createPollAPI = async (payload: Partial<Poll>): Promise<Poll> => {
  return pollService.createPoll(payload);
};

export const voteAPI = async (pollId: string, optionId: string): Promise<Poll | null> => {
  return pollService.vote(pollId, optionId);
};
