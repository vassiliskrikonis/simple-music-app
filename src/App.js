import React, { useReducer } from "react";
import Header from "./Header";
import AlbumList from "./AlbumList";
import Player from "./Player";
import TrackList from "./Tracklist";
import { Router } from "@reach/router";
import { getAlbums, useApi } from "./api";
import { clamp } from "lodash-es";

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
  switch (action.type) {
    case "SELECT_TRACK":
      return {
        ...state,
        currentAlbum: action.album,
        currentTrackIdx: action.trackIdx,
      };
    case "PLAY_PREVIOUS":
      return {
        ...state,
        currentTrackIdx: clamp(
          state.currentTrackIdx - 1,
          0,
          state.currentAlbum.tracklist.length - 1
        ),
      };
    case "PLAY_NEXT":
      return {
        ...state,
        currentTrackIdx: clamp(
          state.currentTrackIdx + 1,
          0,
          state.currentAlbum.tracklist.length - 1
        ),
      };
    default:
      return state;
  }
};

function App() {
  const [loading, albums, error] = useApi(getAlbums);
  const [playerState, dispatch] = useReducer(playerStateReducer, {});

  const playPrevious = () =>
    dispatch({
      type: "PLAY_PREVIOUS",
    });
  const playNext = () =>
    dispatch({
      type: "PLAY_NEXT",
    });

  const track =
    playerState.currentAlbum &&
    playerState.currentAlbum.tracklist[playerState.currentTrackIdx];

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
          <div className="separator h-24 w-full"></div>
          <Player
            title={
              playerState.currentAlbum &&
              `${playerState.currentAlbum.artist} - ${track.title}`
            }
            src={track?.src}
            onPrevious={playPrevious}
            onNext={playNext}
            autoplay={true}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default App;
