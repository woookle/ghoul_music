import { createSlice } from "@reduxjs/toolkit";
import { delMusic, getMusics, uplMusic } from "../api/musicsAPI";

const musicSlice = createSlice({
  name: "music",
  initialState: {
    musics: [],
    isLoad: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getMusics.pending, (state, action) => {
      state.isLoad = true;
    })
    .addCase(getMusics.fulfilled, (state, action) => {
      state.isLoad = false;
      state.musics = action.payload
    })
    .addCase(delMusic.fulfilled, (state, action) => {
      state.musics = state.musics.filter(el => el._id !== action.payload);
    })
    .addCase(uplMusic.fulfilled, (state, action) => {
      state.musics.push(action.payload)
    })
  }
});


export default musicSlice.reducer;
