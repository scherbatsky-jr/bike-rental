import React from 'react';
import { useNavigate } from 'react-router-dom';

import "../assets/css/components/navbar.scss"

function Navbar() {
  const navigate = useNavigate()

  const tokenExists = !!(localStorage.getItem("token"))

  const onLogout = () => {
    localStorage.removeItem("token")
    
    navigate("/login")
  }

  const goTo = (page) => {
    navigate("/" + page)
  }

  return (
    <>
      <div className="navbar">
        <a href='/' className='header'>Shred Nepal</a>
        <div className='navbar-links'>
          <a className='navbar-link' onClick={() => goTo('bikes')}>Rent a bike</a>
          {
            tokenExists ?
              <a className='navbar-link' onClick={() => goTo('bookings')}>My Bookings</a>
            : <></>
          }
          <a className='navbar-link' onClick={() => goTo('contactus')}>Contact</a>
          {
            tokenExists ?
            <a className='navbar-link' onClick={onLogout}>Logout</a>
            :
            <>
              <a className='navbar-link' onClick={() => goTo('login')}>Login</a>
              <a className='navbar-link' onClick={() => goTo('signup')}>Signup</a>
            </>
          }
        </div>
      </div>
    </>
  );
}

export default Navbar;
