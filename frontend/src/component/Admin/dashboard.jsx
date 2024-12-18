import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./Dashboard.css";
import { FiUser, FiList, FiBell, FiMessageCircle } from "react-icons/fi";
import { IoMdAlbums } from "react-icons/io";
import { BiSolidPlaylist } from "react-icons/bi";
const dashboard = () => {
  const location = useLocation();
  const handleClick = (path) => {
    setActiveLink(path);
  }
  return (

    <div className="dashboard">
      <nav className='navbar-dashboard'>
        <h1 className='name-logo'>Spotify</h1>
        <ul className="dashboard-menu">
          <li className='li-dashboard'>

            <Link className={`dashboard-link ${location.pathname === "/admin/user" ? 'active' : ''}`}
              to="/admin/user"
              onClick={() => handleClick('/admin/user')}> <FiUser style={{ width: '25px', height: '30px', }} />
              <span className='span-dash'> Users</span></Link>
          </li>
          <li className='li-dashboard'>
            <Link to="/admin/tracks"
              className={`dashboard-link ${location.pathname === "/admin/tracks" ? 'active' : ''}`}
              onClick={() => handleClick('/admin/tracks')}>
              <BiSolidPlaylist style={{ width: '25px', height: '30px' }} />
              <span className='span-dash'> Tracks</span>
            </Link>
          </li>

          <li className='li-dashboard'>

            <Link to="/admin/albums"
              className={`dashboard-link ${location.pathname === "/admin/albums" ? 'active' : ''}`}
              onClick={() => handleClick('/admin/ablums')}>
              <IoMdAlbums style={{ width: '25px', height: '30px' }} />
              <span className='span-dash'> Albums</span>
            </Link>
          </li>
          <li className='li-dashboard'>
            <Link to="/admin/artist"
              className={`dashboard-link ${location.pathname === "/admin/artists" ? 'active' : ''}`}
              onClick={() => handleClick('/admin/artist')}>
              <FiUser style={{ width: '25px', height: '30px' }} />
              <span className='span-dash'> Artists</span>
            </Link>
          </li>

          <li className='li-dashboard'>

            <Link to="/admin/genres"
              className={`dashboard-link ${location.pathname === "/admin/genres" ? 'active' : ''}`}
              onClick={() => handleClick('/admin/genres')}>
              <FiList style={{ width: '25px', height: '30px' }} />
              <span className='span-dash'>Genres</span>
            </Link>
          </li>
          <li className='li-dashboard'>

            <Link to="/admin/notifications"
              className={`dashboard-link ${location.pathname === "/admin/notifications" ? 'active' : ''}`}
              onClick={() => handleClick('/admin/notifications')}>
              <FiBell style={{ width: '25px', height: '30px' }} />
              <span className='span-dash'>Notifications</span>
            </Link>
          </li>
          <li className='li-dashboard'>

            <Link to="/admin/feedback"
              className={`dashboard-link ${location.pathname === "/admin/feedback" ? 'active' : ''}`}
              onClick={() => handleClick('/admin/feedback')}>
              <FiMessageCircle style={{ width: '25px', height: '30px' }} />
              <span className='span-dash'>Feedback</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>

  )
}

export default dashboard
