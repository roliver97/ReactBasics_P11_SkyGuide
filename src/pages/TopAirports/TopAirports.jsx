import React from 'react'
import './TopAirports.css'
import AirportGrid from '../../components/AirportGrid/AirportGrid'
import airportsLocalData from '../../data/airports-spain/airports-spain.json'

const TopAirports = () => {
  const topAirportsIatas = [
    'MAD',
    'BCN',
    ' PMI',
    'AGP',
    'ALC',
    'LPA',
    'TFS',
    'VLC'
  ]

  const filteredAirports = airportsLocalData.filter((airport) =>
    topAirportsIatas.includes(airport.iata)
  )

  const sortedAirports = [...filteredAirports].sort((a, b) => {
    const aValue = parseFloat(a.traffic.passengers)
    const bValue = parseFloat(b.traffic.passengers)

    return bValue - aValue
  })

  return (
    <div className='top-airports-page flex-container'>
      <div className='top-airports-titles flex-container'>
        <h1>Top Airports in Spain</h1>
        <h3>
          Discover Spain's primary aviation hubs and explore real-time flight
          data, passenger statistics and connectivity.
        </h3>
      </div>

      <div className='top-airports-grid wrapper'>
        <AirportGrid airports={sortedAirports} variant='top' />
      </div>
    </div>
  )
}

export default TopAirports
