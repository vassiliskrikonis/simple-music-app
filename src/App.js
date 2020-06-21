import React, { useReducer } from "react";
import Header from "./Header";
import AlbumList from "./AlbumList";
import Player from "./Player";
import TrackList from "./Tracklist";
import { Router } from "@reach/router";
import { getAlbums, useApi } from "./api";

const TrackListView = ({ albumId, albums, dispatch }) => {
  const album = albums.find((album) => album.id === albumId);
  if (album) {
    return (
      <React.Fragment>
        <Header
          text={album.title}
          secondaryText={album.artist}
          background={album.cover}
        />
        <TrackList
          tracks={album.tracklist}
          onTrackSelected={(trackIdx) =>
            dispatch({
              type: "SELECT_TRACK",
              album,
              trackIdx,
            })
          }
        />
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

const playerStateReducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "SELECT_TRACK":
      return {
        ...state,
        currentTrack: action.album.tracklist[action.trackIdx],
      };
    default:
      return state;
  }
};

function App() {
  const [loading, albums, error] = useApi(getAlbums);
  const [playerState, dispatch] = useReducer(playerStateReducer, {});

  return (
    <React.Fragment>
      {error && <div>Failed to fetch albums!</div>}
      {loading && <div>Loading albums...</div>}
      {albums && (
        <React.Fragment>
          <Router>
            <AlbumsView path="/" albums={albums} />
            <AlbumsView path="/albums" albums={albums} />
            <TrackListView
              path="/albums/:albumId"
              albums={albums}
              dispatch={dispatch}
            />
          </Router>
          <Player track={playerState.currentTrack} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default App;
