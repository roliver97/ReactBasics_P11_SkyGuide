import React from 'react'
import './Header.css'
import { NavLink, Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div className='wrapper'>
        <Link to='/' className='app-logo-link'>
          <div className='app-logo-div'>
            <img
              className='app-logo-icon'
              src='/assets/icons/logo-icon.svg'
              alt='Sky Guide logo image'
            />
            <div className='app-logo-text-div'>
              <h1 className='app-logo-title'>SKY GUIDE</h1>
              <h4 className='app-logo-subtitle'>SPAIN EDITION</h4>
            </div>
          </div>
        </Link>
        <nav>
          <NavLink to='/'>Explorer</NavLink>
          <NavLink to='/top-airports'>Top Airports</NavLink>
          <NavLink to='/live-flights'>Live Flights</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
