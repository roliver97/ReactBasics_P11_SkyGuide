import React from 'react'
import './AirportDetail.css'
import { useParams } from 'react-router-dom'

import airportsLocalData from '../../data/airports-spain/airports-spain.json'
import LiveWeather from '../../components/LiveWeather/LiveWeather'

const AirportDetail = () => {
  const { iata } = useParams()

  const airport = airportsLocalData.find((a) => a.iata === iata)

  if (!airport) {
    return (
      <div className='error-container'>
        <h3>This airport is not in our records 📡</h3>
        <Link to='/'>Back to Home</Link>
      </div>
    )
  }

  return (
    <section className='detail-page flex-container'>
      <div className='detail-image-container flex-container'>
        <img
          src={airport.image || '/images/placeholder-airport.jpg'}
          alt={airport.name}
          className='detail-image'
          onError={(e) => {
            // Si la imatge falla, la Màquina canvia la font per una imatge local que tu tinguis
            e.target.src = '/assets/images/default-airport.png'
            e.target.classList.add('card-image-error')
          }}
        />
      </div>

      <div className='detail-title-container wrapper flex-container'>
        <h1>{airport.name}</h1>
        <hr className='detail-separator' />
        <div className='detail-subtitle-container flex-container'>
          <h3>{airport.city} </h3>
          <span className='iata-span'>{airport.iata}</span>
        </div>
      </div>

      <div className='detail-description-container wrapper flex-container'>
        <p>{airport.description}</p>
      </div>

      <LiveWeather airport={airport} />
    </section>
  )
}

export default AirportDetail
