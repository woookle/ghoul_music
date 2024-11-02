import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faHeart, faPause } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getMusics } from "../../api/musicsAPI";
import { toast } from "react-toastify";
import { addFavorites, removeFavorites } from "../../api/artistAPI";
import {
  pauseAudio,
  playAudio,
  setCurrentTrack,
  setTracks,
} from "../../store/playerSlice";
import { NavLink } from "react-router-dom";

const Catalog = () => {
  const dispatch = useDispatch();

  const musics = useSelector((state) => state.music.musics);
  const auth = useSelector((state) => state.auth);
  const isPlay = useSelector((state) => state.player.isPlaying);
  const playerMusicsList = useSelector((state) => state.player.tracks);
  const currentTrackIndex = useSelector(
    (state) => state.player.currentTrackIndex
  );

  const [slicecounter, setSliceCounter] = useState(5);
  const [search, setSearch] = useState("");
  const [filteredMusic, setFilteredMusic] = useState([]);

  useEffect(() => {
    dispatch(getMusics());
  }, [dispatch]);

  useEffect(() => {
    const newFilteredMusic = musics.filter(
      (el) =>
        el.name.toLowerCase().includes(search.toLowerCase()) ||
        el.userId.nickname.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMusic(newFilteredMusic);
  }, [search, musics]);

  const slicedList = filteredMusic.slice(0, slicecounter);

  const addToFavorite = (musicId) => {
    if (!auth.isAuth) {
      toast.info("Вы не зарегистрированы!");
    } else {
      dispatch(addFavorites({ userId: auth.account._id, musicId: musicId }));
    }
  };

  const removeFromFavorite = (musicId) => {
    dispatch(removeFavorites({ userId: auth.account._id, musicId: musicId }));
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
    <div className="catalog animate__animated animate__fadeIn">
      <div className="container">
        <h1 className="animate__animated animate__fadeInUp">Каталог</h1>
        <input
          type="text"
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="animate__animated animate__fadeInUp"
        />
        <div className="musics_container animate__animated animate__fadeInLeft">
          {slicedList.length == 0 ? (
            <p className="no_music_catalog">Ничего не найдено!</p>
          ) : (
            slicedList.map((el, index) => (
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
                        playerMusicsList[currentTrackIndex].name == el.name ? (
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
                      <NavLink
                        to={`/profile/${el.userId._id}`}
                        className="music_actor"
                      >
                        {el.userId.nickname}
                      </NavLink>
                    </div>
                  </div>
                  <div className="duration_and_isFavorite">
                    <p className="duration">{el.duration}</p>
                    {auth.isAuth ? (
                      auth.account.favoritesMusics.includes(el._id) ? (
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="favorite_icon"
                          onClick={() => removeFromFavorite(el._id)}
                          style={{ color: "#ff3c3c" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="favorite_icon"
                          onClick={() => addToFavorite(el._id)}
                        />
                      )
                    ) : (
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="favorite_icon"
                        onClick={() => addToFavorite(el._id)}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {filteredMusic.length > slicecounter && (
          <button
            type="button"
            className="show_more"
            onClick={() => setSliceCounter(slicecounter + 5)}
          >
            Показать ещё
          </button>
        )}
      </div>
    </div>
  );
};

export default Catalog;
