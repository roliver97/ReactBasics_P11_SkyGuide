import React, { useState } from 'react'
import './Explorer.css'

import airportsLocalData from '../../data/airports-spain/airports-spain.json'
import ExplorerHero from '../../components/ExplorerHero/ExplorerHero'
import AirportGrid from '../../components/AirportGrid/AirportGrid'

const Explorer = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAirports = airportsLocalData.filter(
    (airport) =>
      airport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.iata.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='explorer-page'>
      <section className='explorer-hero'>
        <ExplorerHero onSearch={setSearchTerm} />
      </section>
      <section className='explorer-content wrapper'>
        <AirportGrid airports={filteredAirports} />
      </section>
    </div>
  )
}

/* PROPS

1. Para pasar datos (Padre → Hijo)
Es el uso más habitual. El padre envía información para que el hijo la muestre.
Ejemplo: Pasamos el objeto 'airport' a la 'AirportCard'.
Efecto: El hijo recibe los datos y los pinta, pero no los puede cambiar. Es de "solo lectura".

2. Para pasar acciones (Hijo → Padre)
Es lo que hacemos con el buscador. El padre envía una función.
Ejemplo: Pasamos 'setSearchTerm' (o una función que la contenga) al 'ExplorerHero' (setSearchTerm no deja de ser una función, por eso la guardamos dentro de una clave (onSearch) y funciona si la pasamos como prop).
Efecto: El hijo puede ejecutar esta función cuando el usuario interactúa (como al escribir). 
Esto permite que el hijo "avise" al padre de que debe actualizar el estado.
*/

export default Explorer
