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

export const getMusics = createAsyncThunk(
  'musics/getmusics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get('/musics');
      return response.data;
    } catch (error) {
      toast.error('Ошибка при загрузке списка треков!');
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);

export const delMusic = createAsyncThunk(
  'musics/delmusic',
  async ({ musicId }, { rejectWithValue }) => {
    try {
      const response = await instance.delete('/musics/delete', {
        data: { musicId },
      });
      toast.success('Трек успешно удален!');
      return response.data.musicId;
    } catch (error) {
      toast.error('Ошибка при удалении трека!');
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);

export const uplMusic = createAsyncThunk(
  'musics/upload',
  async (musicinfo, { rejectWithValue }) => {
    try {
      const response = await instance.post('/musics/upload', musicinfo, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Отлично!');
      toast.info('Ваш трек будет добавлен в течени минуты!');
      return response.data.media;
    } catch (error) {
      toast.error('Ошибка при загрузке трека!');
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);