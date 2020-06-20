import React from "react";

const AlbumListItem = ({ album = {} }) => (
  <article className="Album list-item">
    <img src={album.cover} alt={album.title + " Cover"} />
    <h1>{album.title}</h1>
    <h2>{album.artist}</h2>
  </article>
);

const AlbumList = ({ albums = [] }) => (
  <React.Fragment>
    {albums.map((album, idx) => (
      <AlbumListItem key={idx} album={album} />
    ))}
  </React.Fragment>
);

export default AlbumList;
