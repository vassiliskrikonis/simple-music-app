import React, { useState } from "react";
import Header from "./Header";
import AlbumList from "./AlbumList";
import Player from "./Player";
import TrackList from "./Tracklist";

const albums = [
  {
    id: "album1",
    cover:
      "https://t2.genius.com/unsafe/788x0/https%3A%2F%2Fimages.genius.com%2F4e54547882b714c6aafbd31b7ab40f61.1000x1000x1.jpg",
    title: "Good at falling",
    artist: "The Japanese House",
    tracklist: [
      {
        title: "went to meet her",
        src:
          "http://docs.google.com/uc?export=open&id=1gIBk7BAdSnm4b6GSvM-e7zPs01eKHZWp",
      },
      {
        title: "Maybe you're the reason",
        src:
          "http://docs.google.com/uc?export=open&id=1gIBk7BAdSnm4b6GSvM-e7zPs01eKHZWp",
      },
      {
        title: "We talk all the time",
        src:
          "http://docs.google.com/uc?export=open&id=1gIBk7BAdSnm4b6GSvM-e7zPs01eKHZWp",
      },
      {
        title: "Wild",
        src:
          "http://docs.google.com/uc?export=open&id=1gIBk7BAdSnm4b6GSvM-e7zPs01eKHZWp",
      },
      {
        title: "You Seemed So Happy",
        src:
          "http://docs.google.com/uc?export=open&id=1gIBk7BAdSnm4b6GSvM-e7zPs01eKHZWp",
      },
      {
        title: "Follow My Girl",
        src:
          "http://docs.google.com/uc?export=open&id=1gIBk7BAdSnm4b6GSvM-e7zPs01eKHZWp",
      },
      {
        title: "somethingfartoogoodtofeel",
        src:
          "http://docs.google.com/uc?export=open&id=1gIBk7BAdSnm4b6GSvM-e7zPs01eKHZWp",
      },
      {
        title: "Lilo",
        src:
          "http://docs.google.com/uc?export=open&id=1gIBk7BAdSnm4b6GSvM-e7zPs01eKHZWp",
      },
      {
        title: "Everybody Hates Me",
        src:
          "http://docs.google.com/uc?export=open&id=1gIBk7BAdSnm4b6GSvM-e7zPs01eKHZWp",
      },
      {
        title: "Marika is Sleeping",
        src:
          "http://docs.google.com/uc?export=open&id=1gIBk7BAdSnm4b6GSvM-e7zPs01eKHZWp",
      },
      {
        title: "Worms",
        src:
          "http://docs.google.com/uc?export=open&id=1gIBk7BAdSnm4b6GSvM-e7zPs01eKHZWp",
      },
      {
        title: "f a r a w a y",
        src:
          "http://docs.google.com/uc?export=open&id=1gIBk7BAdSnm4b6GSvM-e7zPs01eKHZWp",
      },
      {
        title: "i say you in a dream",
        src:
          "http://docs.google.com/uc?export=open&id=1gIBk7BAdSnm4b6GSvM-e7zPs01eKHZWp",
      },
    ],
  },
  {
    id: "album2",
    cover:
      "https://t2.genius.com/unsafe/788x0/https%3A%2F%2Fimages.genius.com%2F5fec5748892b0b3a094ac3f82759d0f0.1000x1000x1.jpg",
    title: "EP2 - EP",
    artist: "FKA twigs",
    tracklist: [
      {
        title: "How's That",
        src:
          "http://docs.google.com/uc?export=open&id=1gIBk7BAdSnm4b6GSvM-e7zPs01eKHZWp",
      },
      {
        title: "Papi Pacify",
        src:
          "http://docs.google.com/uc?export=open&id=1gIBk7BAdSnm4b6GSvM-e7zPs01eKHZWp",
      },
      {
        title: "Water Me",
        src:
          "http://docs.google.com/uc?export=open&id=1gIBk7BAdSnm4b6GSvM-e7zPs01eKHZWp",
      },
      {
        title: "Ultraviolet",
        src:
          "http://docs.google.com/uc?export=open&id=1gIBk7BAdSnm4b6GSvM-e7zPs01eKHZWp",
      },
    ],
  },
];

function App() {
  const [currentAlbum, setCurrentAlbum] = useState();
  const [currentTrack, setCurrentTrack] = useState();
  return (
    <React.Fragment>
      <Header />
      <AlbumList albums={albums} />
      <TrackList tracks={albums[0].tracklist} />
      <Player track={currentTrack} />
    </React.Fragment>
  );
}

export default App;
