import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Header/Header.css';
import { FiHome, FiBell, FiSearch } from 'react-icons/fi';
const header = () => {

  return (
    <nav className="navbar ">
      {/* Container wrapper */}
      <div className="container-wrapper">
        {/* //Toggle button  */}
        {/* <button
      data-mdb-collapse-init
      class="navbar-toggler"
      type="button"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button> */}

        {/* // Collapsible wrapper */}
        <div className="collapsible-wrapper">
          {/* // Navbar brand */}
          <Link className="navbar-brand " to="/">
            <img
              src="/logo.png"
              height="45"
              alt="Spotify Logo"
              loading="lazy"
            />
          </Link>
          {/* //Left links  */}
          <ul className="navbar-left-link">
            <li className="nav-item">
              <Link class="nav-link" to="/">
                <FiHome style={{ width: '40px', height: '30px' }} />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">All</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">Music</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">PodCart</Link>
            </li>
          </ul>


        </div>


        {/* //Right elements  */}
        <div className="right-elements">
          {/* Search */}
          <div className="search-container">
            <form >
              <input type="text" placeholder="Search.." name="search" className='inp-search' />
              <button type="submit" className='btn-search'><FiSearch /></button>
            </form>
          </div>
          {/* //Notifications  */}
          <Link className="notifications" href="#">
            <FiBell style={{ width: '20px', height: '30px' }} />
          </Link>

          {/* ///User */}
          <div className='user'>
            <ul className='nav-right'>
              <li className='nav-item'>
                <Link className='register-nav' to='/register'>Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </nav>


  );
};

export default header
