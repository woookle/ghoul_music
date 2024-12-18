import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delMusic, getMusics } from "../../api/musicsAPI";
import { NavLink } from "react-router-dom";

const MyMusic = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMusics());
  }, [dispatch]);

  const [search, setSearch] = useState("");
  const [filteredMusic, setFilteredMusic] = useState([]);

  const auth = useSelector((state) => state.auth.account);
  const musics = useSelector((state) => state.music.musics);
  const isLoad = useSelector((state) => state.music.isLoad);
  const isAuth = useSelector((state) => state.auth.isAuth)

  const [mymusiclist, setMyMusicList] = useState([]);

  useEffect(() => {
    if (auth && musics) {
      const filtered = mymusiclist.filter((el) =>
        el.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredMusic(filtered);
    }
  }, [search, isLoad]);

  useEffect(() => {
    if (auth) {
      const mylist = musics.filter((el) => el.userId._id === auth._id);
      setMyMusicList(mylist);
    }
  }, [isLoad]);

  const deleteMusicFunction = (musicId) => {
    dispatch(delMusic(musicId));
  };

  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <section className="my_music animate__animated animate__fadeIn">
      <h1 className="animate__animated animate__fadeInUp">Мои треки</h1>
      <div className="upload_music_link animate__animated animate__fadeInUp">
        <NavLink to={"/uploadmusic"}>Загрузить трек</NavLink>
      </div>
      <div className="input_block animate__animated animate__fadeInUp">
        <input
          type="text"
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="container animate__animated animate__fadeInUp">
        {isLoad || !isAuth ? (
          <div className="loading_man">Загрузка...</div>
        ) : filteredMusic.length === 0 ? (
          <p className="no_your_musics">Ничего не найдено!</p>
        ) : (
          filteredMusic.map((el) => (
            <div
              key={el._id}
              className="music_card"
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${API_URL}${el.imageUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="music_image"
                style={{
                  background: `url('${API_URL}${el.imageUrl}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                }}
              ></div>
              <p className="music_title">{el.name}</p>
              <button
                type="button"
                className="delete_music"
                onClick={() => {
                  deleteMusicFunction(el._id);
                }}
              >
                Удалить
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default MyMusic;
