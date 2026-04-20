import React, { useEffect, useState } from 'react'
import './LiveWeather.css'
import {
  formatWeatherData,
  translateWeatherCode
} from '../../utils/weatherUtils'

const LiveWeather = ({ airport }) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!airport.lat || !airport.lng) return

    const weatherFetch = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${airport.lat}&longitude=${airport.lng}&current_weather=true`
        )
        const data = await response.json()
        setWeather(data.current_weather)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching weather:', error.message)
      }
    }

    weatherFetch()
  }, [airport.lat, airport.lng])

  //* En el primer renderizado weather será "null" así que usamos un condicional para evitar el pintado de weather-widget antes de que el estado "weather" contenga ningún valor
  //* En el primer renderizado loading será "false" así que usamos un condicional para pintar un mensaje de loading mientras el fetch nos resuelve la promesa
  if (loading || !weather) {
    return (
      <div className='weather-widget flex-container wrapper'>
        <p>Searching coordinates and weather... 📡</p>{' '}
      </div>
    )
  }

  const weatherCodeData = translateWeatherCode(weather.weathercode)
  const weatherFormattedDate = formatWeatherData(weather.time)

  return (
    <div className='weather-widget flex-container wrapper'>
      <h3>
        Current weather at {airport.name} in {airport.city}, Spain
      </h3>
      <div className='weather-info flex-container'>
        <div className='flex-container'>
          <span className='weather-date'>📆 {weatherFormattedDate.date}</span>

          <span className='weather-time'>🕐 {weatherFormattedDate.time} h</span>
        </div>

        <span className='weather-temp'>{weather.temperature}°C</span>

        <div className='flex-container'>
          <span className='weather-desc'>
            {weatherCodeData.emoji} {weatherCodeData.description}
          </span>

          <span className='weather-wind'>💨 {weather.windspeed} km/h</span>
        </div>
      </div>
    </div>
  )
}

export default LiveWeather
