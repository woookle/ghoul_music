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
  faVolumeUp,
  faVolumeDown,
  faVolumeMute,
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
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [lastVolume, setLastVolume] = useState(1);

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

  // Устанавливаем громкость аудиоэлемента
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

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
    dispatch(nextTrack()); // Переключаем на следующий трек после завершения текущего
  };

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    dispatch(setCurrentTime(newTime));
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (newVolume !== 0) {
      setLastVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(lastVolume);
    } else {
      setLastVolume(volume);
      setVolume(0);
    }
    setIsMuted(!isMuted);
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
        <div className={style.volume_controls}>
          <button
            onClick={toggleMute}
            className={`${style.volumeButton} ${isMuted && style.mute}`}
          >
            {isMuted || volume === 0 ? (
              <FontAwesomeIcon icon={faVolumeMute} />
            ) : volume < 0.5 ? (
              <FontAwesomeIcon icon={faVolumeDown} />
            ) : (
              <FontAwesomeIcon icon={faVolumeUp} />
            )}
          </button>
          <input
            className={style.volumeSlider}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
