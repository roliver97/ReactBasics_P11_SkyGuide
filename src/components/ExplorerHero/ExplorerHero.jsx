import React from 'react'
import './ExplorerHero.css'

const ExplorerHero = ({ onSearch }) => {
  return (
    <>
      <div className='hero-text'>
        <h1>
          SKY GUIDE <span> SPAIN EDITION </span>
        </h1>
        <p>Real-time information on Spanish airports</p>
      </div>
      <div className='search-box wrapper'>
        <input
          type='text'
          placeholder='Search by city or IATA code...'
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </>
  )
}

export default ExplorerHero
