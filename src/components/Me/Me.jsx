import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMusics } from "../../api/musicsAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { changeAvatar } from "../../api/artistAPI";
import MainSettings from "../AccountSettings/MainSettings";
import {
  pauseAudio,
  playAudio,
  setCurrentTrack,
  setTracks,
} from "../../store/playerSlice";

const Me = () => {
  const dispatch = useDispatch();

  const me = useSelector((state) => state.auth.account);
  const musics = useSelector((state) => state.music.musics);
  const isLoad = useSelector((state) => state.music.isLoad);

  const [search, setSearch] = useState("");
  const [mymusic, setMyMusic] = useState([]);
  const [totalTracks, setTotalTracks] = useState(0);
  const [isOpenSettings, setIsOpen] = useState(false);

  const isPlay = useSelector((state) => state.player.isPlaying);
  const playerMusicsList = useSelector((state) => state.player.tracks);
  const currentTrackIndex = useSelector((state) => state.player.currentTrackIndex);

  useEffect(() => {
    dispatch(getMusics());
  }, []);

  useEffect(() => {
    const myMusicList = musics.filter((el) => el.userId._id === me._id);
    setMyMusic(myMusicList);
    setTotalTracks(myMusicList.length);
  }, [isLoad, me]);

  const filteredMusic = mymusic.filter((el) =>
    el.name.toLowerCase().includes(search.toLowerCase())
  );

  const avatarChange = (new_avatar) => {
    const formData = new FormData();
    formData.append("image", new_avatar.target.files[0]);
    formData.append("userId", me._id);

    dispatch(changeAvatar(formData));
  };

  const get_settings = () => {
    setIsOpen(true);
  };

  const playMusic = (musicIndex) => {
    dispatch(setTracks(filteredMusic));
    dispatch(setCurrentTrack(musicIndex));
    dispatch(playAudio());
  };

  const pauseMusic = () => {
    dispatch(pauseAudio());
  };

  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <section className="my_account animate__animated animate__fadeIn">
      {isOpenSettings && <MainSettings setIsOpen={setIsOpen} />}
      <div className="container">
        <div className="top_block animate__animated animate__fadeInLeft">
          <div className="avatar_and_nickname">
            <div
              className="avatar_image"
              style={{
                backgroundImage: `url('${API_URL}${me.avatar}')`,
                backgroundPosition: "top",
                backgroundSize: "cover",
              }}
            >
              <input
                type="file"
                id="new_avatar"
                accept="image/*"
                onChange={avatarChange}
              />
              <label htmlFor="new_avatar">изменить</label>
            </div>
            <div className="nickname_and_settings_button">
              <p className="nickname">{me.nickname}</p>
              <button type="button" onClick={get_settings}>
                Настройки
              </button>
            </div>
          </div>
          <div className="total_tracks">
            {isLoad || me == [] ? "Загрузка..." : `Треков: ${totalTracks}`}
          </div>
        </div>
        <div className="main_content animate__animated animate__fadeInRight">
          <div className="search_block">
            <input
              type="text"
              placeholder="Поиск по названию"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="tracks">
            {isLoad || me == [] ? (
              <div>Загрузка...</div>
            ) : filteredMusic.length === 0 ? (
              <p className="no_your_musics">Ничего не найдено!</p>
            ) : (
              filteredMusic.map((el, index) => (
                <div className="card" key={el._id}>
                  <div className="card_main">
                    <div className="card_image_and_actor">
                      <button
                        type="button"
                        className="play_button"
                        style={{
                          backgroundImage: `url(${API_URL}${el.imageUrl})`,
                        }}
                      >
                        {playerMusicsList.length != 0 ? (
                          isPlay &&
                          playerMusicsList[currentTrackIndex].name ==
                            el.name ? (
                            <FontAwesomeIcon
                              icon={faPause}
                              onClick={() => pauseMusic(index)}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faPlay}
                              onClick={() => {
                                playMusic(index);
                              }}
                            />
                          )
                        ) : (
                          <FontAwesomeIcon
                            icon={faPlay}
                            onClick={() => {
                              playMusic(index);
                            }}
                          />
                        )}
                      </button>
                      <div className="actor_and_nickname">
                        <p className="music_name">{el.name}</p>
                      </div>
                    </div>
                    <div className="duration_and_isFavorite">
                      <p className="duration">{el.duration}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Me;
