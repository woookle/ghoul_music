import { configureStore } from '@reduxjs/toolkit';
import playerReducer from "./playerSlice";
import musicReducer from "./musicsSlice";
import actorsReducer from "./actorsSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    music: musicReducer,
    actors: actorsReducer,
    auth: authReducer
  },
});