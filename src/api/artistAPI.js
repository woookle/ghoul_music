import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

export const getActors = createAsyncThunk("actors/getactors", async () => {
  const response = await axios.get(`${API_URL}/actor/actors`);
  return response.data;
});

export const loginActors = createAsyncThunk(
  "actors/loginactors",
  async (user) => {
    try {
      const response = await axios.post(`${API_URL}/actor/login`, user);
      toast.success(`Добро пожаловать, ${response.data.nickname}!`);
      return response.data;
    } catch (error) {
      toast.error("Неправильный логин или пароль!");
      return error.response.data;
    }
  }
);

export const registerActor = createAsyncThunk(
  "actors/registerActor",
  async (user) => {
    const response = await axios.post(`${API_URL}/actor/register`, user);
    toast.success("Вы успешно зарегистрировались!");
    return response.data.actor;
  }
);

export const addFavorites = createAsyncThunk(
  "actors/addfavorites",
  async (mus) => {
    const response = await axios.post(`${API_URL}/actor/addfavorites`, mus);
    toast.success("Трек добавлен в избранные!");
    return mus.musicId;
  }
);

export const removeFavorites = createAsyncThunk(
  "actors/removefavorites",
  async (mus) => {
    const response = await axios.delete(`${API_URL}/actor/removefavorites`, {
      data: { userId: mus.userId, musicId: mus.musicId },
    });
    toast.success("Трек удален из избранных!");
    return mus.musicId;
  }
);

export const changeAvatar = createAsyncThunk(
  "actors/changeavatar",
  async (file) => {
    const response = await axios.post(`${API_URL}/actor/changeavatar`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Аватарка обновлена!");
    return response.data.newpath;
  }
);

export const changeNickname = createAsyncThunk(
  "actor/changenickname",
  async (mus) => {
    const response = await axios.post(`${API_URL}/actor/changenickname`, mus);
    toast.success("Ник успешно изменен!");
    return mus.newnickname;
  }
);

export const changePassword = createAsyncThunk(
  "actor/changepassword",
  async (mus) => {
    const response = await axios.post(`${API_URL}/actor/changepassword`, mus);
    toast.success("Пароль успешно изменен!");
    return mus.newpassword;
  }
);
