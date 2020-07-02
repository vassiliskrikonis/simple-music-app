import React, { useRef, useEffect, useState } from "react";
import { formatDuration } from "./utils";

function useAudio(src) {
  const audioRef = useRef(new Audio());
  const [status, setStatus] = useState("idle");
  const [duration, setDuration] = useState();
  const [currentTime, setCurrentTime] = useState();
  useEffect(() => {
    if (!src) return;
    const audio = audioRef.current;
    setStatus("loading");
    const onLoad = () => {
      setStatus("loaded");
      setDuration(audio.duration);
    };
    const onCurrentTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    audio.addEventListener("loadeddata", onLoad);
    audio.addEventListener("timeupdate", onCurrentTimeUpdate);
    audio.src = src;
    return () => {
      audio.removeEventListener("loadeddata", onLoad);
      audio.removeEventListener("timeupdate", onCurrentTimeUpdate);
    };
  }, [src]);

  return {
    play: () => {
      audioRef.current.play
        .bind(audioRef.current)()
        .then(
          () => {
            setStatus("playing");
          },
          error => {
            setStatus("error");
            console.log(error);
          },
        );
    },
    pause: () => {
      audioRef.current.pause.bind(audioRef.current)();
      setStatus("paused");
    },
    status,
    currentTime,
    duration,
  };
}

const PlayerControlBtn = ({ children, onClick }) => (
  <button
    className="player-controls player-controls-previous text-5xl ml-2 cursor-pointer"
    onClick={onClick}
  >
    {children}
  </button>
);

const PlayerControls = ({
  onPrevious,
  onNext,
  onPlay,
  onPause,
  showPlayBtn,
  showPauseBtn
}) => (
  <div className="player-controls flex">
    <PlayerControlBtn onClick={onPrevious}>⏮</PlayerControlBtn>
    {showPlayBtn && <PlayerControlBtn onClick={onPlay}>⏯</PlayerControlBtn>}
    {showPauseBtn && <PlayerControlBtn onClick={onPause}>⏸</PlayerControlBtn>}
    <PlayerControlBtn onClick={onNext}>⏭</PlayerControlBtn>
  </div>
);

const PlayerTrackInfo = ({ title = "N/A", currentTime, duration }) => (
  <div className="tract-info ml-10">
    <h2>{title}</h2>
    <div>
      <span className="duration-playing">{formatDuration(currentTime)}</span>
      <span className="duration-separator">/</span>
      <span className="duration-overall">{formatDuration(duration)}</span>
    </div>
  </div>
);

const Player = ({ title, track = {}, onPrevious, onNext }) => {
  const { play, pause, duration, status, currentTime } = useAudio(track.src);
  const text =
    status === "idle"
      ? "N/A"
      : status === "loading"
      ? "Loading track..."
      : title || track.title;
  return (
    <div className="Player fixed bottom-0 h-24 w-full bg-red-100 p-4 flex items-center">
      <PlayerControls
        onPrevious={onPrevious}
        onNext={onNext}
        onPlay={play}
        onPause={pause}
        showPlayBtn={status !== "playing"}
        showPauseBtn={status === "playing"}
      />
      <PlayerTrackInfo
        title={text}
        currentTime={currentTime}
        duration={duration}
      />
    </div>
  );
};

export default Player;
