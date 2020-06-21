import React from "react";

const Track = ({ title, duration, onClick }) => (
  <li className="Track list-item" onClick={() => onClick()}>
    <span className="title">{title}</span>
    <span className="duration">{duration}</span>
  </li>
);

const TrackList = ({ tracks = [], onTrackSelected }) => (
  <ul className="Tracklist list">
    {tracks.map((track, idx) => (
      <Track
        key={idx}
        title={track.title}
        duration={track.duration}
        onClick={() => onTrackSelected(idx)}
      />
    ))}
  </ul>
);

export default TrackList;
