import React, { useEffect, useState } from 'react'
import './LiveFlights.css'
import mockData from '../../data/flights-mock/flights-mock.json'

const USE_REAL_API = false //! CAMBIAR A TRUE CUANDO QUERAMOS DEJAR DE USAR EL MOCK Y USAR LA API REAL.
const API_KEY = import.meta.env.VITE_AVIATIONSTACK_KEY

const LiveFlights = ({ airport }) => {
  const [flights, setFlights] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769)

  useEffect(() => {
    //! Sin este useEffect el estado isMobile solo se calcularia una vez (cuando cargásemos la página)
    const handleResize = () => setIsMobile(window.innerWidth < 769)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize) //! Sin este return de limpieza, al cerrar el componente LiveFlights (cambiando por ejemplo de sección o página) el listener se quedaria escuchando indefinidamente el resize de una ventana que ya no existe.
    // El return devuelve una función porque necesitamos que React la guarde para ejecutarla más tarde (cuando el componente muera)
  }, [])

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
      if (filter === 'all') return true //? el "filter" dentro de los if hace referencia al estado filter
      if (filter === 'active') return f.flight_status === 'active'
      if (filter === 'scheduled') return f.flight_status === 'scheduled'
      if (filter === 'delayed') return f.departure?.delay > 0
      return true
    })
    .slice(0, 8)

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
          Flying Now
        </button>
        <button
          onClick={() => setFilter('scheduled')}
          className={filter === 'scheduled' ? 'active' : ''}
        >
          Scheduled
        </button>
        <button
          onClick={() => setFilter('delayed')}
          className={filter === 'delayed' ? 'active' : ''}
        >
          Delays
        </button>
      </div>

      <hr className='live-flight-separator' />

      <div className='flights-info-container'>
        {!isMobile && (
          <div className='flights-header'>
            <span>FLIGHT</span>
            <span>ROUTE</span>
            <span>TIME</span>
            <span>STATUS</span>
            {/* Afegim un buit per si hi ha notes/delays */}
            <span>NOTES</span>
          </div>
        )}

        <ul>
          {filteredFlights?.map((f, index) => (
            <li key={index}>
              {isMobile && (
                <div className='flights-header mobile-only'>
                  <span>FLIGHT</span>
                  <span>ROUTE</span>
                  <span>TIME</span>
                  <span>STATUS</span>
                  <span>NOTES</span>
                </div>
              )}

              <div className='flights-info'>
                <span className='flight-number'>{f.flight?.number}</span>
                <span className='flight-dest'>
                  {' '}
                  <abbr title={airport.name} className='iata-info'>
                    {airport.iata}
                  </abbr>{' '}
                  ➡️{' '}
                  <abbr
                    title={f.arrival?.airport || 'Unknown City'}
                    className='iata-info'
                  >
                    {f.arrival?.iata}
                  </abbr>
                </span>
                <span className='flight-time'>
                  {f.departure?.scheduled
                    ? `${f.departure.scheduled.split('T')[1].slice(0, 5)}h`
                    : '--:--'}
                </span>
                <span className={`status status-${f.flight_status}`}>
                  {f.flight_status}
                </span>
                <span
                  className={
                    f.departure?.delay > 0
                      ? 'flight-delay-time delayed'
                      : 'flight-delay-time'
                  }
                >
                  {f.departure?.delay > 0
                    ? `${f.departure?.delay}min delayed`
                    : 'On time'}
                </span>
              </div>
            </li>
          ))}
          {filteredFlights.length === 0 && (
            <p>No flights found for this category.</p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default LiveFlights
