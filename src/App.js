import React from "react";
import Header from "./Header";
import AlbumList from "./AlbumList";
import Player from "./Player";
import TrackList from "./Tracklist";
import { Router } from "@reach/router";
import { getAlbums, useApi } from "./api";

const TrackListView = ({ albumId, albums }) => {
  const album = albums.find((album) => album.id === albumId);
  if (album) {
    return (
      <React.Fragment>
        <Header
          text={album.title}
          secondaryText={album.artist}
          background={album.cover}
        />
        <TrackList tracks={album.tracklist} />
      </React.Fragment>
    );
  } else {
    return <div>Album not found</div>;
  }
};

const AlbumsView = ({ albums }) => (
  <React.Fragment>
    <Header text="Albums" />
    <AlbumList albums={albums} />
  </React.Fragment>
);

function App() {
  const [loading, albums, error] = useApi(getAlbums);

  return (
    <React.Fragment>
      {error && <div>Failed to fetch albums!</div>}
      {loading && <div>Loading albums...</div>}
      {albums && (
        <React.Fragment>
          <Router>
            <AlbumsView path="/" albums={albums} />
            <AlbumsView path="/albums" albums={albums} />
            <TrackListView path="/albums/:albumId" albums={albums} />
          </Router>
          <Player />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default App;
