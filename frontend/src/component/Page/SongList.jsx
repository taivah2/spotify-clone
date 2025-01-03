import React from "react";
import "./songList.css";

const SongList = ({ songs, onSongSelect }) => {
  return (
    <div className="song-list">
      {songs.map((song) => (
        <div key={song._id} className="song-card" onClick={() => onSongSelect(song)}>
          <img src={song.img} alt={song.name} />
          <div>
            <h4>{song.name}</h4>
            <p>{song.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
