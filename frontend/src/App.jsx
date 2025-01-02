import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './component/Auth/register';
import Login from './component/Auth/login';
import Dashboard from './component/Admin/dashboard';
import Home from './component/Page/home';
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
          element={<Dashboard />} />
      </Routes>

      <div className="Dashboard">
        <Routes>
          <Route path="/admin/user" element={<User />}></Route>
         
        </Routes>
      </div>




    </>
  )
}

export default App
