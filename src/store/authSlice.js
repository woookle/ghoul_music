import { createSlice } from "@reduxjs/toolkit";
import { addFavorites, changeAvatar, changeNickname, changePassword, loginActors, registerActor, removeFavorites } from "../api/artistAPI";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    account: {},
    isAuth: false
  },
  reducers: {
    logout: (state, action) => {
      state.account = {};
      state.isAuth = false;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginActors.fulfilled, (state, action) => {
      state.account = action.payload;
      state.isAuth = true;
    })
    .addCase(registerActor.fulfilled, (state, action) => {
      state.account = action.payload;
      state.isAuth = true;
    })
    .addCase(addFavorites.fulfilled, (state, action) => {
      state.account.favoritesMusics.push(action.payload)
    })
    .addCase(removeFavorites.fulfilled, (state, action) => {
      state.account.favoritesMusics = state.account.favoritesMusics.filter(id => id.toString() != action.payload)
    })
    .addCase(changeAvatar.fulfilled, (state, action) => {
      state.account.avatar = action.payload;
    })
    .addCase(changeNickname.fulfilled, (state, action) => {
      state.account.nickname = action.payload
    })
    .addCase(changePassword.fulfilled, (state, action) => {
      state.account.password = action.payload
    })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;