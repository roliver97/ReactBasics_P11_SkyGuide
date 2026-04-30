import React, { useEffect, useState } from 'react'
import './LiveFlights.css'
import mockData from '../../data/flights-mock/flights-mock.json'
import FlightRow from './FlightRow'

const USE_REAL_API = false //! CAMBIAR A TRUE CUANDO QUERAMOS DEJAR DE USAR EL MOCK Y USAR LA API REAL.
const API_KEY = import.meta.env.VITE_AVIATIONSTACK_KEY

const LiveFlights = ({ airport }) => {
  const [flights, setFlights] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769)

  useEffect(() => {
    //! Sin este useEffect añadiriamos en bucle distintos EventListeners con cada "resize" de la pantalla, ya que provocaría un nuevo render del componente. En cambio, si lo encapsulamos dentro de useEffect solo añadiremos 1 listener al renderizar el componente.
    const handleResize = () => setIsMobile(window.innerWidth < 769)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize) //! Sin este return de limpieza, al cerrar el componente LiveFlights (cambiando por ejemplo de sección o página) el listener se quedaria escuchando indefinidamente el resize de una ventana que ya no existe.
    // El return devuelve una función porque necesitamos que React la guarde para ejecutarla más tarde (cuando el componente muera)
  }, [])

  useEffect(() => {
    const getFlights = async () => {
      setLoading(true)

      if (!USE_REAL_API) {
        const sortedFlights = [...mockData.data].sort((a, b) => {
          const aVal = a.departure.scheduled.split('T')[1].slice(0, 5)
          const bVal = b.departure.scheduled.split('T')[1].slice(0, 5)
          return aVal.localeCompare(bVal) //? Como estamos comparando strings, necesitamos el método localCompare()
        })
        setFlights(sortedFlights)
        setLoading(false)
        return
      }

      try {
        const response = await fetch(
          `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&dep_iata=${airport.iata}`
        )
        const result = await response.json()
        const allFlights = result.data || []

        const now = new Date()
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

        let filteredFlights = allFlights.filter((f) => {
          const flightOnTime =
            f.departure?.scheduled?.split('T')[1]?.slice(0, 5) || ''
          return flightOnTime >= currentTime
          // Podemos filtrar para que se muestren los vuelos posteriores a la hora de la petición, pero, debido a las limitaciones que tiene la API (100 vuelos por petición) en su versión básica, no podemos asegurar que los vuelos que devuelva sean justo los próximos por salir.
        })

        const sortedFlights = [...filteredFlights].sort((a, b) => {
          const aVal = a.departure?.scheduled?.split('T')[1].slice(0, 5)
          const bVal = b.departure?.scheduled?.split('T')[1].slice(0, 5)
          return aVal.localeCompare(bVal) //? Como estamos comparando strings, necesitamos el método localCompare()
        })
        setFlights(sortedFlights)
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
      if (filter === 'all') return true //? estos "filter" dentro de los if hacen referencia al estado filter
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
            <FlightRow
              key={`${f.flight?.number}-${index}`}
              flight={f}
              airport={airport}
              isMobile={isMobile}
            />
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
