import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connections: null,
};

export const connectionSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    addConnections: (state, action) => {
      return {
        ...state,
        connections: action.payload,
      };
    },
    removeConnections: (state) => {
      return {
        ...state,
        connections: null,
      };
    },
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
