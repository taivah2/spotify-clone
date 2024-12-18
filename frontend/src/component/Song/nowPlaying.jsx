import React from "react";

function NowPlaying({ currentSong }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Now Playing</h2>
      {currentSong ? (
        <div>
          <p className="text-lg">{currentSong.title}</p>
          <p className="text-sm text-gray-400">{currentSong.artist}</p>
        </div>
      ) : (
        <p>No song playing</p>
      )}
    </div>
  );
}

export default NowPlaying;