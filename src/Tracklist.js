import React from "react";

const Track = ({ title, duration, onClick }) => (
  <li
    className="Track list-item p-2 m-2 mb-4 bg-gray-100 shadow cursor-pointer"
    onClick={() => onClick()}
  >
    <span>▶️</span>
    <span className="title ml-3">{title}</span>
    <span className="duration">{duration}</span>
  </li>
);

const TrackList = ({ tracks = [], onTrackSelected }) => (
  <ul className="Tracklist list p-6">
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
