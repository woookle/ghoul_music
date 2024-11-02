import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { uplMusic } from "../../api/musicsAPI";
import { useNavigate } from "react-router-dom";

const UploadMusic = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [correctImageName, setCorrectImageName] = useState("ничего нет");
  const [correctAudioName, setCorrectAudioName] = useState("ничего нет");

  const [trackName, setTrackName] = useState('');
  const [musicFile, setMusicFile] = useState();
  const [imageFile, setImageFile] = useState();

  const userid = useSelector(state => state.auth.account._id);

  const music = (file) => {
    setCorrectImageName(file.target.files[0].name);
    setImageFile(file.target.files[0])
  };
  const musicaudio = (file) => {
    setCorrectAudioName(file.target.files[0].name);
    setMusicFile(file.target.files[0])
  };

  const uploadMusicFunction = () => {
    if(!imageFile) {
      return toast.error('Обложка не загружена!')
    } else if(!musicFile) {
      return toast.error('Трек не загружен!')
    } else if(trackName.trim() == '') {
      return toast.error('Введите корректное название трека')
    } else {
      const formData = new FormData();
      formData.append("audio", musicFile);
      formData.append("image", imageFile);
      formData.append("userId", userid);
      formData.append("name", trackName);

      dispatch(uplMusic(formData));
      navigate('/mymusic')
    }
  }

  const updateTrackName = (txt) => {
    setTrackName(txt)
  }

  return (
    <section className="uploading_music animate__animated animate__fadeInUp">
      <div className="container">
        <h1 className="animate__animated animate__fadeInUp">Добавьте свой шедевр ;)</h1>
        <div className="upload_music_form animate__animated animate__fadeInUp">
          <input
            className="input_music_name animate__animated animate__fadeInUp"
            type="text"
            placeholder="Введите название трека"
            value={trackName}
            onChange={(txt) => updateTrackName(txt.target.value)}
          />
          <div className="files_inputs_main animate__animated animate__fadeInDown">
            <div className="upload_music_block">
              <p className="music_image_text">Обложка трека</p>
              <label htmlFor="uploadingMusicImage">Выберите файл</label>
              <p className="music_filename">{correctImageName}</p>
              <input
                type="file"
                accept="image/*"
                onChange={(file) => {
                  music(file);
                }}
                id="uploadingMusicImage"
              />
            </div>
            <div className="upload_music_block">
              <p className="music_image_text">Трек</p>
              <label htmlFor="uploadingMusicAudio">Выберите файл</label>
              <p className="music_filename">{correctAudioName}</p>
              <input
                type="file"
                accept="audio/*"
                onChange={(file) => {
                  musicaudio(file);
                }}
                id="uploadingMusicAudio"
              />
            </div>
          </div>
          <button type="button" onClick={uploadMusicFunction} className="animate__animated animate__fadeInUp">Выложить трек</button>
        </div>
      </div>
    </section>
  );
};

export default UploadMusic;
