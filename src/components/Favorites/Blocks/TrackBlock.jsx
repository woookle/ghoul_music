import React from "react";
import downloadAudio from "../../../utils/downloadAudio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPause,
  faPlay,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const TrackBlock = ({
  el,
  playerMusicsList,
  isPlay,
  currentTrackIndex,
  pauseMusic,
  playMusic,
  index,
  removeFromFavorites,
  auth
}) => {
  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <div className="card" key={el._id}>
      <div className="card_main">
        <div className="card_image_and_actor">
          <button
            type="button"
            className="play_button"
            style={{
              backgroundImage: `url(${API_URL}${el.imageUrl})`,
            }}
            onClick={() => {
              isPlay && playerMusicsList[currentTrackIndex].name == el.name
                ? pauseMusic(index)
                : playMusic(index);
            }}
          >
            {playerMusicsList.length != 0 ? (
              isPlay && playerMusicsList[currentTrackIndex].name == el.name ? (
                <FontAwesomeIcon icon={faPause} />
              ) : (
                <FontAwesomeIcon icon={faPlay} />
              )
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
          <div className="actor_and_nickname">
            <p className="music_name">{el.name}</p>
            <NavLink to={auth._id == el.userId._id ? '/me' : `/profile/${el.userId._id}`} className="music_actor">
              {el.userId.nickname}
            </NavLink>
          </div>
        </div>
        <div className="duration_and_isFavorite">
          <p className="duration">{el.duration}</p>
          <FontAwesomeIcon
            icon={faDownload}
            className="download_icon"
            onClick={() => downloadAudio(el._id)}
          />
          <FontAwesomeIcon
            icon={faXmark}
            className="delete_icon"
            onClick={() => removeFromFavorites(el._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default TrackBlock;
