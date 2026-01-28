import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feed: [],
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeed: (state, action) => {
      return {
        ...state,
        feed:action.payload
      };
    },
    removeFeed: (state,action) => {
      const updatedFeeds = state.feed.filter(f=>f._id !== action.payload)
      return {
        ...state,
        feed:updatedFeeds
      }
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
