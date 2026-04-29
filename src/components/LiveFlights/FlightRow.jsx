import React from 'react'

const FlightRow = ({ flight, airport, isMobile }) => {
  return (
    <li>
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
        <span className='flight-number'>{flight.flight?.number}</span>
        <span className='flight-dest'>
          {' '}
          <abbr title={airport.name} className='iata-info'>
            {airport.iata}
          </abbr>{' '}
          ➡️{' '}
          <abbr
            title={flight.arrival?.airport || 'Unknown City'}
            className='iata-info'
          >
            {flight.arrival?.iata}
          </abbr>
        </span>
        <span className='flight-time'>
          {flight.departure?.scheduled
            ? `${flight.departure.scheduled.split('T')[1].slice(0, 5)}h`
            : '--:--'}
        </span>
        <span className={`status status-${flight.flight_status}`}>
          {flight.flight_status}
        </span>
        <span
          className={
            flight.departure?.delay > 0
              ? 'flight-delay-time delayed'
              : 'flight-delay-time'
          }
        >
          {flight.departure?.delay > 0
            ? `${flight.departure?.delay}min delayed`
            : 'On time'}
        </span>
      </div>
    </li>
  )
}

export default FlightRow
