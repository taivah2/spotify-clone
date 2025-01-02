import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiBell, FiSearch, FiUser } from "react-icons/fi";
import Logout from "../Auth/logout";
import "./Header.css";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user information from localStorage when the component renders
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    setCurrentUser(storedUserName);
  }, []);

  const handleSearch = async (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = await searchSpotify(event.target.value);
    setSearchResults(results);
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
  };

  return (
    <nav className="navbar">
      {/* Container wrapper */}
      <div className="wrapper-container">
        {/* Collapsible wrapper */}
        <div className="wrapper">
          {/* Navbar brand */}
          <Link className="brand" to="/">
            <img src="/logo.png" height="45" alt="Spotify Logo" loading="lazy" />
          </Link>

          {/* Left links */}
          <ul className="left">
            <li className="li-item">
              <Link className="link-item" to="/">
                <FiHome style={{ width: "40px", height: "30px" }} />
              </Link>
            </li>
            <li className="li-item">
              <Link className="link-item" to="#">All</Link>
            </li>
            <li className="li-item">
              <Link className="link-item" to="#">Music</Link>
            </li>
          </ul>
        </div>

        {/* Right elements */}
        <div className="right">
          {/* Search */}
          <div className="container-search">
            <form>
              <input
                type="text"
                placeholder="Search..."
                name="search"
                className="inp-search"
                value={searchTerm}
                onChange={handleSearch}
              />
              <button type="submit" className="button-search">
                <FiSearch />
              </button>
            </form>
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((track) => (
                  <div key={track.id} className="search-result-item">
                    <img src={track.album.images[0]?.url} alt={track.name} />
                    <div>
                      <p>{track.name}</p>
                      <p className="artist">{track.artists[0]?.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <Link className="notifications" to="#">
            <FiBell style={{ width: "20px", height: "30px" }} />
          </Link>

          {/* User */}
          <div className="user">
            <ul className="nav-right">
              <li className="li-item">
                {currentUser ? (
                  <>
                    <Link to="/profile">
                      <FiUser className="icon-nav" />
                      <span className="welcome-text">{currentUser}</span>
                    </Link>
                    <Logout onLogout={handleUserLogout} />
                  </>
                ) : (
                  <Link className="register-nav" to="/register">Register</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
