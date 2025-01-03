import React, { useState, useEffect } from "react";
import "./songCard.css";

const SongCard = ({ selectedSong, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1); // Volume value from 0 to 1

  useEffect(() => {
    if (selectedSong) {
      const newAudio = new Audio(selectedSong.audioURL); // Make sure audioURL is correct
      setAudio(newAudio);

      // Clean up audio when component unmounts or selectedSong changes
      return () => {
        newAudio.pause();
        newAudio.currentTime = 0;
      };
    }
  }, [selectedSong]);

  useEffect(() => {
    if (audio) {
      audio.volume = volume; // Update volume when it changes
      const updateTime = () => setCurrentTime(audio.currentTime);
      audio.addEventListener("timeupdate", updateTime);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
      };
    }
  }, [audio, volume]);

  // Handle play/pause action
  const handlePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle seeking the song progress
  const handleSeek = (event) => {
    if (audio) {
      const newTime = event.target.value;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle volume change
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  if (!selectedSong) {
    return null;
  }

  // Ensure audio duration is available before showing it
  const audioDuration = audio ? audio.duration : 0;
  const formattedDuration = audioDuration ? `${Math.floor(audioDuration / 60)}:${Math.floor(audioDuration % 60).toString().padStart(2, "0")}` : "00:00";

  return (
    <div className="music-player-bar">
      <div className="player-left">
        <img src={selectedSong.img} alt={selectedSong.name} className="song-cover" />
        <div className="song-info">
          <h4>{selectedSong.name}</h4>
          <p>{selectedSong.artist}</p>
        </div>
      </div>
      <div className="player-center">
        <div className="controls">
          <button onClick={() => audio && (audio.currentTime = 0)}>&#8634;</button>
          <button onClick={handlePlayPause}>{isPlaying ? "⏸️" : "▶️"}</button>
          <button onClick={() => audio && (audio.currentTime = audio.duration)}>&#9205;</button>
        </div>
        <div className="progress-bar">
          <input
            type="range"
            min="0"
            max={audio ? audio.duration : 0}
            value={currentTime}
            onChange={handleSeek}
          />
          <div className="time-info">
            <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, "0")}</span>
            <span>{formattedDuration}</span>
          </div>
        </div>
      </div>
      <div className="player-right">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
        <button onClick={onClose}>❌</button>
      </div>
    </div>
  );
};

export default SongCard;
