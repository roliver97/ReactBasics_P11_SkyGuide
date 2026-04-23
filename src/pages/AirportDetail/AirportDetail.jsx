import React from 'react'
import './AirportDetail.css'
import { useParams } from 'react-router-dom'

import airportsLocalData from '../../data/airports-spain/airports-spain.json'
import LiveWeather from '../../components/LiveWeather/LiveWeather'
import LiveFlights from '../../components/LiveFlights/LiveFlights'

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

      <div className='detail-title-container wrapper flex-container'>
        <h1>{airport.name}</h1>
        <h3>{airport.city} </h3>
        <span className='iata-span'>{airport.iata}</span>

        <div>
          <hr className='detail-separator' />
        </div>
      </div>

      <div className='detail-content-container wrapper'>
        <div className='detail-description-container  flex-container'>
          <p>{airport.description}</p>
        </div>

        <div className='detail-widgets-container '>
          <LiveWeather airport={airport} />
          <LiveFlights airport={airport} />
        </div>
      </div>
    </section>
  )
}

export default AirportDetail
