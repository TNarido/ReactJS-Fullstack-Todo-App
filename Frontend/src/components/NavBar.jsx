import React from 'react';
import './NavBar.css'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <nav>
        <div className = 'nav-container'>
            <ul>
                <li><Link to = "/">Login</Link></li>
                <li><Link to = "/register">Register</Link></li>
                <li><Link to = "/home">Home</Link></li>
            </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
