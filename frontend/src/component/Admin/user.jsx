import React, { useState, useEffect } from 'react';
import Dashboard from "./dashboard"
import { FiSearch } from "react-icons/fi";
import "./user.css"
const user = () => {
 
    
  return (
    
   <>
<nav className="navbar navbar-dark sticky-top flex-md-nowrap p-0 ">
  <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
  <ul className="navbar-nav px-3">
    <li className="nav-item text-nowrap">
      <a className="nav-link" href="#">Sign out</a>
    </li>
  </ul>
</nav>

   </>
  );
}




export default user
