import React from 'react'
import './AirportCard.css'
import { Link } from 'react-router-dom'

const AirportCard = ({ airport }) => {
  const originalImgUrl = airport.image
  const optimizedImgUrl = originalImgUrl.replace(
    '/upload/',
    '/upload/q_auto/f_auto/w_450/'
  )

  return (
    <Link to={`/airport/${airport.iata}`}>
      <div className='airport-card'>
        <h1>{airport.name}</h1>
        <div className='card-info'>
          <p>{airport.city} </p>
          <span> | </span>
          <span className='iata-span'>{airport.iata}</span>
        </div>
        <div className='card-image'>
          <img
            src={optimizedImgUrl || '/images/placeholder-airport.jpg'}
            alt={airport.name}
            loading='lazy'
            onError={(e) => {
              // Si la imatge falla, la Màquina canvia la font per una imatge local que tu tinguis
              e.target.src = '/assets/images/default-airport.png'
              e.target.classList.add('card-image-error')
            }}
          />
        </div>
      </div>
    </Link>
  )
}

export default AirportCard
