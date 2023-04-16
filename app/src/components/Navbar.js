import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '@iconify/react';

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

  // navbar menu options are based on if user is logged in or not
  return (
      <div className="navbar">
        <div className='navbar-left'>
          <a href='/' className='header'>Shred Nepal</a>
          <div className='navbar-links'>
            <a className='navbar-link' onClick={() => goTo('bikes')}>Rent a bike</a>
            {
              tokenExists ?
                <a className='navbar-link' onClick={() => goTo('bookings')}>My Bookings</a>
              : <></>
            }
            <a className='navbar-link' onClick={() => goTo('contactus')}>Contact</a>
          </div>
          </div>
        <div div className='navbar-links'>
          {
            tokenExists ?
            <a className='navbar-link' onClick={onLogout}>Logout</a>
            :
            <a className='navbar-link navbar-login' onClick={() => goTo('login')}>
              <Icon icon="material-symbols:login" />
              <span>Login</span>
            </a>
          }
        </div>
      </div>
  );
}

export default Navbar;
