import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getActors = createAsyncThunk(
  "actors/getactors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/actor/actors");
      return response.data;
    } catch (error) {
      toast.error("Ошибка при загрузке списка актеров!");
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);

export const loginActors = createAsyncThunk(
  "actors/loginactors",
  async (user, { rejectWithValue }) => {
    try {
      const response = await instance.post("/actor/login", user);
      toast.success(`Добро пожаловать, ${response.data.user.nickname}!`);
      return response.data;
    } catch (error) {
      toast.error("Неправильный логин или пароль!");
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);

export const registerActor = createAsyncThunk(
  "actors/registerActor",
  async (user, { rejectWithValue }) => {
    try {
      const response = await instance.post("/actor/register", user);
      toast.success("Вы успешно зарегистрировались!");
      return response.data;
    } catch (error) {
      toast.error("Ошибка при регистрации!");
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);

export const addFavorites = createAsyncThunk(
  "actors/addfavorites",
  async (mus, { rejectWithValue }) => {
    try {
      const response = await instance.post("/actor/addfavorites", mus);
      toast.success("Трек добавлен в избранные!");
      return mus.musicId;
    } catch (error) {
      toast.error("Ошибка при добавлении трека в избранное!");
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);

export const removeFavorites = createAsyncThunk(
  "actors/removefavorites",
  async (mus, { rejectWithValue }) => {
    try {
      const response = await instance.delete("/actor/removefavorites", {
        data: mus,
      });
      toast.success("Трек удален из избранных!");
      return mus.musicId;
    } catch (error) {
      toast.error("Ошибка при удалении трека из избранного!");
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);

export const changeAvatar = createAsyncThunk(
  "actors/changeavatar",
  async (file, { rejectWithValue }) => {
    try {
      const response = await instance.patch("/actor/changeavatar", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Аватарка обновлена!");
      return response.data.newpath;
    } catch (error) {
      toast.error("Ошибка при обновлении аватарки!");
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);

export const changeNickname = createAsyncThunk(
  "actor/changenickname",
  async (mus, { rejectWithValue }) => {
    try {
      const response = await instance.patch("/actor/changenickname", mus);
      toast.success("Ник успешно изменен!");
      return mus.newnickname;
    } catch (error) {
      toast.error("Ошибка при изменении ника!");
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);

export const changePassword = createAsyncThunk(
  "actor/changepassword",
  async (mus, { rejectWithValue }) => {
    try {
      const response = await instance.patch("/actor/changepassword", mus);
      toast.success(response.data.message);
      return mus.newpassword;
    } catch (error) {
      toast.error("Неправильный старый пароль!");
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);


export const checkAuth = createAsyncThunk(
  "actor/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get('/actor/authcheck');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);

export const exitAccount = createAsyncThunk(
  "actor/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.post('/actor/logout');
      toast.success("Вы успешно вышли из аккаунта!");
      return response.data;
    } catch (error) {
      toast.error('Ошибка при выходе из аккаунта!');
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);