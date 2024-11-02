import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { removeFavorites } from "../../api/artistAPI";
import {
  pauseAudio,
  playAudio,
  setCurrentTrack,
  setTracks,
} from "../../store/playerSlice";

const Favorites = () => {
  const dispatch = useDispatch();

  const musics = useSelector((state) => state.music.musics);
  const auth = useSelector((state) => state.auth.account);
  const isLoad = useSelector((state) => state.music.isLoad);
  const isPlay = useSelector((state) => state.player.isPlaying);

  const playerMusicsList = useSelector((state) => state.player.tracks);
  const currentTrackIndex = useSelector(
    (state) => state.player.currentTrackIndex
  );

  const [search, setSearch] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  const favorites = musics.filter((music) =>
    auth.favoritesMusics.includes(music._id)
  );

  useEffect(() => {
    const filtered = favorites.filter(
      (music) =>
        music.name.toLowerCase().includes(search.toLowerCase()) ||
        music.userId.nickname.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredFavorites(filtered);
  }, [search, auth]);

  const removeFromFavorites = (musicId) => {
    dispatch(removeFavorites({ userId: auth._id, musicId: musicId }));
  };

  const playMusic = (musicIndex) => {
    dispatch(setTracks(filteredFavorites));
    dispatch(setCurrentTrack(musicIndex));
    dispatch(playAudio());
  };

  const pauseMusic = () => {
    dispatch(pauseAudio());
  };

  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <section className="favorites animate__animated animate__fadeIn">
      <h1 className="animate__animated animate__fadeInUp">Избранные</h1>
      <div className="search_block animate__animated animate__fadeInUp">
        <input
          type="text"
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="container animate__animated animate__fadeInLeft">
        {isLoad ? (
          <div className="loading_bro">Загрузка...</div>
        ) : filteredFavorites.length === 0 ? (
          <p className="no_your_musics">Ничего не найдено!</p>
        ) : (
          filteredFavorites.map((el, index) => (
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
                    <p className="music_actor">{el.userId.nickname}</p>
                  </div>
                </div>
                <div className="duration_and_isFavorite">
                  <p className="duration">{el.duration}</p>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="delete_icon"
                    onClick={() => removeFromFavorites(el._id)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Favorites;
