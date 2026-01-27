import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: null,
};

const requests = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequests: (state, action) => {
      return {
        ...state,
        requests: action.payload,
      };
    },
    removeRequest: (state, action) => {
      const newRequests = state.requests.filter(
        (req) => req._id !== action.payload,
      );

      return {
        ...state,
        requests: newRequests,
      };
    },
  },
});

export const { addRequests,removeRequest } = requests.actions;

export default requests.reducer;
