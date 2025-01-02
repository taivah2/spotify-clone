import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiUser, FiList, FiBell, FiMessageCircle } from "react-icons/fi";
import { IoMdAlbums } from "react-icons/io";
import { BiSolidPlaylist } from "react-icons/bi";
import LogOut from '../Auth/logout';
import './nav.css'
const Nav = () => {
  const location = useLocation();
  const handleClick = (path) => {
    setActiveLink(path);
  }
  // search

  return (
    <div>
      {/* Top Navbar */}
      <div className="top-navbar">
        <input type="text" placeholder="Search..." className="search-bar" />
        <LogOut />
      </div>
      {/* Navbar */}
      <div className="dashboard">
        <nav className='navbar-dashboard'>
          <Link to="/dashboard" className='dashboard-link'><h1 className='name-logo'>Spotify</h1></Link>
          <ul className="dashboard-menu">
            <li className='li-dashboard'>

              <Link className={`dashboard-link ${location.pathname === "/admin/user" ? 'active' : ''}`}
                to="/admin/user"
                onClick={() => handleClick('/admin/user')}> <FiUser className='icon' />
                <span className='span-dash'> Users</span>
              </Link>
            </li>
            <li className='li-dashboard'>
              <Link to="/admin/tracks"
                className={`dashboard-link ${location.pathname === "/admin/tracks" ? 'active' : ''}`}
                onClick={() => handleClick('/admin/tracks')}>
                <BiSolidPlaylist className='icon' />
                <span className='span-dash'> Tracks</span>
              </Link>
            </li>

            <li className='li-dashboard'>

              <Link to="/admin/albums"
                className={`dashboard-link ${location.pathname === "/admin/albums" ? 'active' : ''}`}
                onClick={() => handleClick('/admin/ablums')}>
                <IoMdAlbums className='icon' />
                <span className='span-dash'> Albums</span>
              </Link>
            </li>
            <li className='li-dashboard'>
              <Link to="/admin/artist"
                className={`dashboard-link ${location.pathname === "/admin/artists" ? 'active' : ''}`}
                onClick={() => handleClick('/admin/artist')}>
                <FiUser className='icon' />
                <span className='span-dash'> Artists</span>
              </Link>
            </li>

            <li className='li-dashboard'>

              <Link to="/admin/genres"
                className={`dashboard-link ${location.pathname === "/admin/genres" ? 'active' : ''}`}
                onClick={() => handleClick('/admin/genres')}>
                <FiList className='icon' />
                <span className='span-dash'>Genres</span>
              </Link>
            </li>
            {/* <li className='li-dashboard'>

              <Link to="/admin/notifications"
                className={`dashboard-link ${location.pathname === "/admin/notifications" ? 'active' : ''}`}
                onClick={() => handleClick('/admin/notifications')}>
                <FiBell className='icon' />
                <span className='span-dash'>Notifications</span>
              </Link>
            </li>
            <li className='li-dashboard'>

              <Link to="/admin/feedback"
                className={`dashboard-link ${location.pathname === "/admin/feedback" ? 'active' : ''}`}
                onClick={() => handleClick('/admin/feedback')}>
                <FiMessageCircle className='icon' />
                <span className='span-dash'>Feedback</span>
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>

      </div>

  )
}

export default Nav
