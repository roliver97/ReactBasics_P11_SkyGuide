import React from 'react'
import './AirportGrid.css'
import AirportCard from '../AirportCard/AirportCard'

const AirportGrid = ({ airports }) => {
  if (!airports || airports.length === 0)
    return (
      <div className='error-container'>
        <h3>There are no airports matching your search.</h3>
      </div>
    )
  return (
    <div className='airport-grid'>
      {airports.map((airport) => (
        <AirportCard key={airport.id} airport={airport} /> // React usa la clave "key" para su control interno, pero el hijo nunca la podrá leer y mucho menos modificar por mucho que lo intentemos. Sería como un nombre de prop reservado. React usa key para identificar cada elemento del virtual DOM.
      ))}
    </div>
  )
}

export default AirportGrid
