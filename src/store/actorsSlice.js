import { createSlice } from "@reduxjs/toolkit";
import { getActors } from "../api/artistAPI";

const actorsSlice = createSlice({
  name: "actors",
  initialState: {
    actors: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getActors.fulfilled, (state, action) => {
      state.actors = action.payload;
    })
  },
});

export default actorsSlice.reducer;