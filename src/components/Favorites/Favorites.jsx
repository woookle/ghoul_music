import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorites } from "../../api/artistAPI";
import {
  pauseAudio,
  playAudio,
  setCurrentTrack,
  setTracks,
} from "../../store/playerSlice";
import { getMusics } from "../../api/musicsAPI";
import TrackBlock from "./Blocks/TrackBlock";

const Favorites = () => {
  const dispatch = useDispatch();

  const musics = useSelector((state) => state.music.musics);
  const auth = useSelector((state) => state.auth.account);
  const isLoad = useSelector((state) => state.music.isLoad);
  const isPlay = useSelector((state) => state.player.isPlaying);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const playerMusicsList = useSelector((state) => state.player.tracks);
  const currentTrackIndex = useSelector(
    (state) => state.player.currentTrackIndex
  );

  const [search, setSearch] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  const favorites = musics.filter(
    (music) => auth != null && auth.favoritesMusics.includes(music._id)
  );

  useEffect(() => {
    if (auth != null) {
      const filtered = favorites.filter(
        (music) =>
          music.name.toLowerCase().includes(search.toLowerCase()) ||
          music.userId.nickname.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredFavorites(filtered);
    }
  }, [search, auth]);

  useEffect(() => {
    dispatch(getMusics());
  }, [dispatch]);

  useEffect(() => {
    if (auth != null) {
      const favorites = musics.filter((music) =>
        auth.favoritesMusics.includes(music._id)
      );
      setFilteredFavorites(favorites);
    }
  }, [isLoad]);

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
      <div className="container animate__animated animate__fadeInUp">
        {isLoad || !isAuth ? (
          <div className="loading_bro">Загрузка...</div>
        ) : filteredFavorites.length === 0 ? (
          <p className="no_your_musics">Ничего не найдено!</p>
        ) : (
          filteredFavorites.map((el, index) => (
            <TrackBlock
              el={el}
              index={index}
              playerMusicsList={playerMusicsList}
              isPlay={isPlay}
              currentTrackIndex={currentTrackIndex}
              pauseMusic={pauseMusic}
              playMusic={playMusic}
              removeFromFavorites={removeFromFavorites}
              auth={auth}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Favorites;
