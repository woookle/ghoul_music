import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

export const getMusics = createAsyncThunk(
  'musics/getmusics',
  async () => {
    const response = await axios.get(`${API_URL}/musics`);
    return response.data;
  }
);

export const delMusic = createAsyncThunk(
  'musics/delmusic',
  async (musicId) => {
    const response = await axios.delete(`${API_URL}/musics/delete`, { data: { musicId } });
    toast.success('Трек успешно удален!');
    return response.data.musicId;
  }
);

export const uplMusic = createAsyncThunk(
  'musics/upload',
  async (musicinfo) => {
    const response = await axios.post(`${API_URL}/musics/upload`, musicinfo, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success('Отлично!');
    toast.info('Ваш трек будет добавлен в течени минуты!');
    return response.data.media;
  }
);