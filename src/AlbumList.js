import React from "react";
import { Link } from "@reach/router";

const AlbumListItem = ({ album = {} }) => (
  <Link to={`/albums/${album.id}`}>
    <article className="Album list-item flex flex-row m-4 bg-gray-100 shadow">
      <img
        src={album.cover}
        alt={album.title + " Cover"}
        className="w-32 h-32"
      />
      <div className="py-8 px-10">
        <h1 className="text-lg">{album.title}</h1>
        <h2 className="text-gray-600">{album.artist}</h2>
      </div>
    </article>
  </Link>
);

const AlbumList = ({ albums = [] }) => (
  <React.Fragment>
    {albums.map((album, idx) => (
      <AlbumListItem key={idx} album={album} />
    ))}
  </React.Fragment>
);

export default AlbumList;
