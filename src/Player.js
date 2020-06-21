import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Player = ({ onPrevious, onNext, cover, title, track = {} }) => (
  <div className="Player fixed bottom-0 w-full">
    <AudioPlayer
      header={title || track.title}
      autoPlay
      autoPlayAfterSrcChange={true}
      showSkipControls={true}
      showJumpControls={false}
      src={track.src}
      onClickPrevious={onPrevious}
      onClickNext={onNext}
    />
  </div>
);

export default Player;
