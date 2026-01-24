import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feed: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeed: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeFeed: () => {
      return null;
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
