
import React from "react";

function Player({ currentSong }) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 flex items-center justify-between">
      <div>
        {currentSong ? (
          <div>
            <p className="text-lg">{currentSong.title}</p>
            <p className="text-sm text-gray-400">{currentSong.artist}</p>
          </div>
        ) : (
          <p>No song playing</p>
        )}
      </div>
      <div className="flex space-x-4">
        <button>⏮️</button>
        <button>⏯️</button>
        <button>⏭️</button>
      </div>
    </div>
  );
}

export default Player;