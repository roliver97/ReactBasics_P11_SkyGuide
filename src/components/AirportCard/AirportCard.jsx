import React from 'react'
import './AirportCard.css'
import { Link } from 'react-router-dom'

const AirportCard = ({ airport, variant }) => {
  const originalImgUrl = airport.image
  const optimizedImgUrl = originalImgUrl.replace(
    '/upload/',
    '/upload/q_auto/f_auto/w_450/'
  )

  return (
    <Link to={`/airport/${airport.iata}`}>
      <div
        className={`airport-card ${variant ? `airport-card-${variant}` : ''}`}
        style={
          variant === 'top'
            ? {
                backgroundImage: `linear-gradient(rgb(255, 255, 255), rgba(255, 255, 255, 0.8)), url(${airport.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }
            : {}
        }
      >
        <div className='card-title'>
          <h1>{airport.name}</h1>
          <div className='card-subtitle'>
            <p>{airport.city} </p>
            <span> | </span>
            <span className='iata-span'>{airport.iata}</span>
          </div>
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

        {variant === 'top' && (
          <div className='airport-top-details flex-container'>
            <p>
              <span>Status:</span> {airport.status}
            </p>
            <p>
              <span>Type:</span> {airport.type}
            </p>
            <p>
              <span>Annual Traffic</span> {airport.traffic.passengers}
              <span>({airport.traffic.year})</span>
            </p>
          </div>
        )}
      </div>
    </Link>
  )
}

export default AirportCard
