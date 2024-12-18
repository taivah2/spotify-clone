import React from "react";
import SongItem from "../Song/songItem"; 

function SongList({ songs, onPlay, currentSong }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Songs</h2>
      <ul>
        {songs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            onPlay={onPlay}
            isCurrentSong={currentSong?.id === song.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default SongList;

