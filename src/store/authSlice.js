import { createSlice } from "@reduxjs/toolkit";
import { addFavorites, changeAvatar, changeNickname, changePassword, checkAuth, exitAccount, loginActors, registerActor, removeFavorites } from "../api/artistAPI";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    account: null,
    isAuth: false
  },
  extraReducers: (builder) => {
    builder
    .addCase(checkAuth.fulfilled, (state, action) => {
      state.account = action.payload.user;
      state.isAuth = true;
    })
    .addCase(checkAuth.rejected, (state, action) => {
      state.account = null;
      state.isAuth = false;
    })
    .addCase(loginActors.fulfilled, (state, action) => {
      if(action.payload.user) {
        state.account = action.payload.user;
        state.isAuth = true;
      }
    })
    .addCase(registerActor.fulfilled, (state, action) => {
      state.account = action.payload.actor;
      state.isAuth = true;
    })
    .addCase(exitAccount.fulfilled, (state, action) => {
      state.account = null;
      state.isAuth = false;
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

export default authSlice.reducer;