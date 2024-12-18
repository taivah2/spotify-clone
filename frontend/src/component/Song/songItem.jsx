
import React from "react";

function SongItem({ song, onPlay, isCurrentSong }) {
  return (
    <li
      className={`p-2 flex justify-between items-center ${
        isCurrentSong ? "bg-gray-700" : "hover:bg-gray-700"
      } cursor-pointer`}
      onClick={() => onPlay(song)}
    >
      <div>
        <p className="text-lg">{song.title}</p>
        <p className="text-sm text-gray-400">{song.artist}</p>
      </div>
      <button className="text-green-500">▶ Play</button>
    </li>
  );
}

export default SongItem;