import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useReducer,
} from "react";
import { formatDuration } from "./utils";

function useAudio(src, onLoad, onError, onPlay, onPause) {
  const audioRef = useRef(new Audio());
  const [source, setSource] = useState(src);
  const [duration, setDuration] = useState();
  const [currentTime, setCurrentTime] = useState();
  useEffect(() => {
    const audio = audioRef.current;
    const _onLoad = () => {
      setDuration(audio.duration);
      onLoad();
    };
    const _onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    audio.addEventListener("loadeddata", _onLoad);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    audio.addEventListener("timeupdate", _onTimeUpdate);
    return () => {
      audio.removeEventListener("loadeddata", _onLoad);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("timeupdate", _onTimeUpdate);
    };
  }, [onLoad, onError, onPlay, onPause]);
  useEffect(() => {
    const audio = audioRef.current;
    source && (audio.src = source);
  }, [source]);
  return {
    load: setSource,
    play: audioRef.current.play.bind(audioRef.current),
    pause: audioRef.current.pause.bind(audioRef.current),
    duration,
    currentTime,
  };
}

const PlayerControlBtn = ({ children, onClick, disabled }) => (
  <button
    className="player-controls player-controls-previous text-5xl ml-2 cursor-pointer"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const PlayerControls = ({ children }) => (
  <div className="player-controls flex">{children}</div>
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

function playerReducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return {
        ...state,
        status: "loading",
        message: "Loading track...",
        disabled: ["play", "pause"],
      };
    case "LOADED":
      return {
        ...state,
        status: "ready",
        message: undefined,
        disabled: [],
      };
    case "ERROR":
      return {
        ...state,
        status: "error",
        message: "Error loading track",
      };
    case "PLAY":
      return {
        ...state,
        status: "playing",
      };
    case "PAUSE":
      return {
        ...state,
        status: "paused",
      };
    default:
      return state;
  }
}

const Player = ({ title, src, onPrevious, onNext, autoplay = false }) => {
  const [state, dispatch] = useReducer(playerReducer, {
    status: "idle",
    disabled: ["play", "pause", "previous", "next"],
  });
  const onLoad = useCallback(() => {
    dispatch({
      type: "LOADED",
    });
  }, []);
  const onError = useCallback(() => {
    dispatch({
      type: "ERROR",
    });
  }, []);
  const onPlay = useCallback(() => {
    dispatch({
      type: "PLAY",
    });
  }, []);
  const onPause = useCallback(() => {
    dispatch({
      type: "PAUSE",
    });
  }, []);
  const { load, play, pause, currentTime, duration } = useAudio(
    src,
    onLoad,
    onError,
    onPlay,
    onPause,
  );
  useEffect(() => {
    if (src) {
      dispatch({
        type: "LOAD",
      });
      load(src);
    }
  }, [load, src]);
  useEffect(() => {
    if (autoplay && state.status === "ready") {
      play();
    }
  }, [autoplay, state.status, play]);

  return (
    <div className="Player fixed bottom-0 h-24 w-full bg-red-100 p-4 flex items-center">
      <PlayerControls>
        <PlayerControlBtn
          onClick={onPrevious}
          disabled={state.disabled.includes("previous")}
        >
          ⏮
        </PlayerControlBtn>
        {state.status === "playing" ? (
          <PlayerControlBtn
            onClick={pause}
            disabled={state.disabled.includes("pause")}
          >
            ⏸
          </PlayerControlBtn>
        ) : (
          <PlayerControlBtn
            onClick={play}
            disabled={state.disabled.includes("play")}
          >
            ⏯
          </PlayerControlBtn>
        )}
        <PlayerControlBtn
          onClick={onNext}
          disabled={state.disabled.includes("next")}
        >
          ⏭
        </PlayerControlBtn>
      </PlayerControls>
      <PlayerTrackInfo
        title={state.message || title}
        currentTime={currentTime}
        duration={duration}
      />
    </div>
  );
};

export default Player;
