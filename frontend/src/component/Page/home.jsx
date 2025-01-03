import React, { useState, useEffect } from "react";
import SongList from "./SongList";
import SongCard from "./SongCard";
import axios from "axios";
import Header from '../Header/header';
import Footer from '../Footer/Footer'
function Home() {
  const [songs, setSongs] = useState([]);  // State for storing song data
  const [selectedSong, setSelectedSong] = useState(null); // State for storing selected song

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/song/getAllSong');
        setSongs(response.data);  // Set songs data in state
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    
    loadSongs();
  }, []);

  const handleSongSelect = (song) => {
    setSelectedSong(song);  // Set the selected song when clicked
  };

  const handleClosePlayer = () => {
    setSelectedSong(null);  // Close the song player
  };

  return (
    <div>
      <Header/>
      <SongList songs={songs} onSongSelect={handleSongSelect} />
      {selectedSong && <SongCard selectedSong={selectedSong} onClose={handleClosePlayer} />}
      <Footer/>
    </div>
  );
}

export default Home;
