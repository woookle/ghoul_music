import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

export default async (fileId) => {
  try {
    const response = await axios.get(`${API_URL}/musics/download/${fileId}`, {
      responseType: 'blob',
      headers: {
        'Accept': 'application/json',
      },
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;

    const contentDisposition = response.headers['content-disposition'];
    let filename = 'audio.mp3';
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch.length > 1) {
        filename = filenameMatch[1];
      }
    }

    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);

    toast.success('Спасибо за скачивание! :p')

  } catch (error) {
    console.log(error)
    toast.error('Ошибка при скачивании аудиофайла!');
  }
}