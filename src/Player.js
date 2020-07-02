import React, { useRef, useEffect, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import { formatDuration } from "./utils";

// const _Player = ({ onPrevious, onNext, cover, title, track = {} }) => (
//   <div className="Player fixed bottom-0 w-full">
//     <AudioPlayer
//       header={title || track.title}
//       autoPlay
//       autoPlayAfterSrcChange={true}
//       showSkipControls={true}
//       showJumpControls={false}
//       src={track.src}
//       onClickPrevious={onPrevious}
//       onClickNext={onNext}
//     />
//   </div>
// );

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
          }
        );
    },
    pause: () => {
      audioRef.current.pause.bind(audioRef.current)();
      setStatus("paused");
    },
    status,
    currentTime,
    duration
  };
}

const Player = ({ title, track = {}, onPrevious, onNext }) => {
  const { play, pause, duration, status, currentTime } = useAudio(track.src);
  const text =
    status === "idle"
      ? "N/A"
      : status === "loading"
      ? "Loading track..."
      : title || track.title || "N/A";
  return (
    <div className="Player fixed bottom-0 h-24 w-full bg-red-100 p-4 flex items-center">
      <div className="player-controls flex">
        <div
          className="player-controls player-controls-previous text-5xl cursor-pointer"
          onClick={onPrevious}
        >
          ⏮
        </div>
        <div
          className="player-controls player-controls-play-pause text-5xl ml-2 cursor-pointer"
          onClick={
            status === "playing"
              ? () => pause()
              : status === "loaded" || status === "paused"
              ? () => play()
              : undefined
          }
        >
          {status === "playing" ? "⏸" : "⏯"}
        </div>
        <div
          className="player-controls player-controls-next text-5xl ml-2 cursor-pointer"
          onClick={onNext}
        >
          ⏭
        </div>
      </div>
      <div className="tract-info ml-10">
        <h2>{text}</h2>
        <div>
          <span className="duration-playing">
            {formatDuration(currentTime)}
          </span>
          <span className="duration-separator">/</span>
          <span className="duration-overall">{formatDuration(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default Player;
