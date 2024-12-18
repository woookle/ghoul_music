import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTracks,
  setCurrentTrackIndex,
  playAudio,
  pauseAudio,
  setCurrentTime,
  setDuration,
  previousTrack,
  nextTrack,
} from "../../store/playerSlice";
import style from "./music.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const MusicPlayer = () => {
  const dispatch = useDispatch();

  const audioRef = useRef(null);

  const { tracks, currentTrackIndex, isPlaying, currentTime, duration } =
    useSelector((state) => state.player);

  const [currentMusicUrl, setCurrentMusicUrl] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  // Обновляем URL текущего трека только при изменении индекса трека или списка треков
  useEffect(() => {
    if (
      tracks.length > 0 &&
      tracks[currentTrackIndex] &&
      tracks[currentTrackIndex].audioUrl
    ) {
      setCurrentMusicUrl(`${API_URL}${tracks[currentTrackIndex].audioUrl}`);
    } else {
      setCurrentMusicUrl("");
    }
  }, [currentTrackIndex, tracks, API_URL]);

  // Устанавливаем src аудиоэлемента только при изменении URL трека
  useEffect(() => {
    if (audioRef.current && currentMusicUrl) {
      audioRef.current.src = currentMusicUrl;
    }
  }, [currentMusicUrl]);

  // Управляем воспроизведением/паузой только при изменении isPlaying
  useEffect(() => {
    if (audioRef.current && currentMusicUrl) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentMusicUrl]);

  // Обработчики событий аудиоэлемента
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("ended", handleTrackEnded);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioRef.current.removeEventListener("ended", handleTrackEnded);
      }
    };
  }, [audioRef]);

  const handlePlay = () => {
    dispatch(playAudio());
  };

  const handlePause = () => {
    dispatch(pauseAudio());
  };

  const handleTimeUpdate = () => {
    dispatch(setCurrentTime(audioRef.current.currentTime));
  };

  const handleLoadedMetadata = () => {
    dispatch(setDuration(audioRef.current.duration));
  };

  const handleTrackEnded = () => {
    dispatch(setCurrentTrackIndex());
  };

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    dispatch(setCurrentTime(newTime));
  };

  return (
    <div
      className={`${style.music__bar} ${isPlaying ? style.active : ""}`}
      style={{
        background:
          tracks.length > 0
            ? `url("${API_URL}${tracks[currentTrackIndex].imageUrl}")`
            : "black",
      }}
    >
      <div className={style.music__container}>
        <div className={style.music_left}>
          <audio ref={audioRef} />
          <button
            onClick={isPlaying ? handlePause : handlePlay}
            disabled={audioRef.current == null || !currentMusicUrl}
            className={!isPlaying && style.pausedButton}
          >
            <div
              className={style.button_background}
              style={{
                backgroundImage:
                  tracks.length > 0 &&
                  `url("${API_URL}${tracks[currentTrackIndex].imageUrl}")`,
              }}
            ></div>
            <div className={style.isplayicon}>
              {isPlaying ? (
                <FontAwesomeIcon icon={faPause} color="#fff" />
              ) : (
                <FontAwesomeIcon icon={faPlay} color="#fff" />
              )}
            </div>
          </button>
          <div className={style.track_buttons}>
            <button
              onClick={() => {
                tracks.length != 0 ? dispatch(previousTrack()) : false;
              }}
              className={style.trackButton}
            >
              <FontAwesomeIcon icon={faStepBackward} />
            </button>
            <button
              onClick={() => {
                tracks.length != 0 ? dispatch(nextTrack()) : false;
              }}
              className={style.trackButton}
            >
              <FontAwesomeIcon icon={faStepForward} />
            </button>
          </div>
        </div>
        <div className={style.music__right}>
          <div className={style.music_time_container}>
            <p>{formatTime(currentTime)}</p>
            <p>{formatTime(duration)}</p>
          </div>
          <input
            className={style.bar}
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeekChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
