import React, { useEffect, useState } from 'react'
import './LiveFlights.css'
import mockData from '../../data/flights-mock/flights-mock.json'

const USE_REAL_API = false //! CAMBIAR A TRUE CUANDO QUERAMOS DEJAR DE USAR EL MOCK Y USAR LA API REAL.
const API_KEY = import.meta.env.VITE_AVIATIONSTACK_KEY

const LiveFlights = ({ airport }) => {
  const [flights, setFlights] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getFlights = async () => {
      setLoading(true)

      if (!USE_REAL_API) {
        setFlights(mockData.data)
        setLoading(false)
        return
      }

      try {
        const response = await fetch(
          `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&dep_iata=${airport.iata}`
        )
        const result = await response.json()
        setFlights(result.data)
        setLoading(false)
      } catch (error) {
        console.error('Error en la API real:', error.message)
        setLoading(false)
      }
    }

    getFlights()
  }, [airport.iata])

  if (loading || !flights) {
    return (
      <div className='live-flights-widget flex-container wrapper'>
        <p>Searching live flights from {airport.name}... 📡</p>{' '}
      </div>
    )
  }

  const filteredFlights = flights
    .filter((f) => {
      if (filter === 'all') return true
      if (filter === 'active') return f.flight_status === 'active'
      if (filter === 'scheduled') return f.flight_status === 'scheduled'
      if (filter === 'delayed') return f.departure?.delay > 0
      return true
    })
    .slice(0, 7)

  return (
    <div className='live-flights-widget flex-container '>
      <h3>Live Departures from {airport.iata}</h3>

      <div className='filter-bar'>
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          Flying Now🛫
        </button>
        <button
          onClick={() => setFilter('scheduled')}
          className={filter === 'scheduled' ? 'active' : ''}
        >
          Scheduled ⏱️
        </button>
        <button
          onClick={() => setFilter('delayed')}
          className={filter === 'delayed' ? 'active' : ''}
        >
          Delays ⚠️
        </button>
      </div>
      <hr className='live-flight-separator' />
      <ul>
        {filteredFlights?.map((f, index) => (
          <li key={index}>
            <span className='flight-number'>{f.flight?.number}</span>
            <span className='flight-dest'>
              {' '}
              {airport.iata} ➡️ {f.arrival?.iata}
            </span>
            <span className='flight-time'>
              (
              {f.departure?.scheduled
                ? `${f.departure.scheduled.split('T')[1].slice(0, 5)}h`
                : '--:--'}
              )
            </span>
            <span className={`status-${f.flight_status}`}>
              {f.flight_status}
            </span>
          </li>
        ))}
        {filteredFlights.length === 0 && (
          <p>No flights found for this category.</p>
        )}
      </ul>
    </div>
  )
}

export default LiveFlights
