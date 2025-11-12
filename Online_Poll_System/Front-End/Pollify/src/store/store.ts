import { configureStore } from "@reduxjs/toolkit";
import pollsReducer from "../features/polls/pollsSlice";

const store = configureStore({
  reducer: {
    polls: pollsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
