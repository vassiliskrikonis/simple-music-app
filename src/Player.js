import React from "react";

const Player = ({ onPrevious, onNext, cover, track = {} }) => (
  <div className="Player">
    {cover && <img alt={`Cover of ${track.title}`} src={cover}></img>}
    <h1>{track.title}</h1>
    <button onClick={() => onPrevious()}>Previous</button>
    <audio src={track.src} controls autoPlay></audio>
    <button onClick={() => onNext()}>Next</button>
  </div>
);

export default Player;
