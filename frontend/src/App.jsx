import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './component/Auth/register';
import Login from './component/Auth/login';
import Dashboard from './component/Admin/dashboard';
import Home from './component/Page/home';
import Header from './component/Header/header';
import SongList from "./component/Song/songList";
import Player from "./component/Song/player";
import NowPlaying from "./component/Song/nowPlaying";
import User from "./component/Admin/user"
import './App.css'

function App() {

  return (
    <>
    
      <Routes>
        <Route
          path='/'
          element={<Home />} />
        <Route
          path='/register'
          element={<Register />} />
        <Route
          path='/login'
          element={<Login />} />
        <Route
          path='/dashboard'
          element={<Dashboard />}/>
       <Route
          path='/admin/user'
          element={<User />}/>
      </Routes>

     

    </>
  )
}

export default App
