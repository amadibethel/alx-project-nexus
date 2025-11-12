import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Poll } from "../../types";
import * as api from "./pollsAPI";

export interface PollsState {
  items: Poll[];
  status: "idle" | "loading" | "failed";
  error?: string | null;
}

const initialState: PollsState = {
  items: [],
  status: "idle",
  error: null
};

export const fetchPolls = createAsyncThunk("polls/fetchAll", async () => {
  const res = await api.fetchPollsAPI();
  return res;
});

export const fetchPoll = createAsyncThunk("polls/fetchById", async (id: string) => {
  const res = await api.getPollByIdAPI(id);
  return res;
});

export const createPoll = createAsyncThunk("polls/create", async (payload: Partial<Poll>) => {
  const res = await api.createPollAPI(payload);
  return res;
});

export const voteOnPoll = createAsyncThunk(
  "polls/vote",
  async ({ pollId, optionId }: { pollId: string; optionId: string }) => {
    const res = await api.voteAPI(pollId, optionId);
    return res;
  }
);

const pollsSlice = createSlice({
  name: "polls",
  initialState,
  reducers: {
    setPolls(state, action: PayloadAction<Poll[]>) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolls.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPolls.fulfilled, (state, action: PayloadAction<Poll[]>) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchPolls.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load polls";
      })
      .addCase(createPoll.fulfilled, (state, action: PayloadAction<Poll>) => {
        state.items.unshift(action.payload); // newest first
      })
      .addCase(voteOnPoll.fulfilled, (state, action: PayloadAction<Poll | null>) => {
        if (!action.payload) return;
        const updated = action.payload;
        const idx = state.items.findIndex((p) => p.id === updated.id);
        if (idx >= 0) state.items[idx] = updated;
        else state.items.push(updated);
      });
  }
});

export const { setPolls } = pollsSlice.actions;
export default pollsSlice.reducer;
