import React from "react";

const Track = ({ title, duration }) => (
  <li className="Track list-item">
    <span className="title">{title}</span>
    <span className="duration">{duration}</span>
  </li>
);

const TrackList = ({ tracks = [] }) => (
  <ul className="Tracklist list">
    {tracks.map((track, idx) => (
      <Track key={idx} title={track.title} duration={track.duration} />
    ))}
  </ul>
);

export default TrackList;
