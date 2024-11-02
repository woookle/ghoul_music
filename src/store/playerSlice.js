import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tracks: [],
  currentTrackIndex: 0,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setTracks: (state, action) => {
      state.tracks = action.payload;
      state.currentTrackIndex = 0;
    },
    setCurrentTrack: (state, action) => {
      state.currentTrackIndex = action.payload
    },
    setCurrentTrackIndex: (state, action) => {
      state.currentTrackIndex = (state.currentTrackIndex + 1) % state.tracks.length;
    },
    playAudio: (state) => {
      state.isPlaying = true;
    },
    pauseAudio: (state) => {
      state.isPlaying = false;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
});

export const { setTracks, setCurrentTrack, setCurrentTrackIndex, playAudio, pauseAudio, setCurrentTime, setDuration } = playerSlice.actions;
export default playerSlice.reducer;