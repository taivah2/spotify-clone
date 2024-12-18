import React, { useState } from "react";
import SongList from "../Song/songList";
import Player from "../Song/player";
import NowPlaying from "../Song/nowPlaying";
import Header from "../Header/header"
function home() {

  const [songs] = useState([
    { id: 1, title: "Song 1", artist: "Artist 1" },
    { id: 2, title: "Song 2", artist: "Artist 2" },
    { id: 3, title: "Song 3", artist: "Artist 3" },
  ]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col">
      <Header/>
      <main className="flex-grow overflow-auto">
        <SongList songs={songs} onPlay={playSong} currentSong={currentSong} />
        <NowPlaying currentSong={currentSong} />
      </main>
      <Player currentSong={currentSong} onPlayPause={togglePlayPause} isPlaying={isPlaying} />
    </div>
  );
}


export default home;
