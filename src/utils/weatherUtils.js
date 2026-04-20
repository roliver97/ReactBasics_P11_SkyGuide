export const translateWeatherCode = (wheaterCode) => {
  const weatherMap = {
    0: { description: 'Sunny', emoji: '☀️' },
    1: { description: 'Mainly Clear', emoji: '🌤️' },
    2: { description: 'Partly Cloudy', emoji: '⛅' },
    3: { description: 'Overcast', emoji: '☁️' },
    45: { description: 'Foggy', emoji: '🌫️' },
    48: { description: 'Rime Fog', emoji: '🌫️' },
    51: { description: 'Light Drizzle', emoji: '🌦️' },
    53: { description: 'Moderate Drizzle', emoji: '🌦️' },
    55: { description: 'Dense Drizzle', emoji: '🌧️' },
    61: { description: 'Slight Rain', emoji: '🌦️' },
    63: { description: 'Moderate Rain', emoji: '🌧️' },
    65: { description: 'Heavy Rain', emoji: '🌊' },
    71: { description: 'Slight Snow', emoji: '🌨️' },
    73: { description: 'Moderate Snow', emoji: '❄️' },
    75: { description: 'Heavy Snow', emoji: '🏔️' },
    77: { description: 'Snow grains', emoji: '❄️' },
    80: { description: 'Slight Rain showers', emoji: '🌦️' },
    81: { description: 'Moderate Rain showers', emoji: '🌧️' },
    82: { description: 'Violent Rain showers', emoji: '⛈️' },
    95: { description: 'Thunderstorm', emoji: '⛈️' },
    96: { description: 'Thunderstorm with slight hail', emoji: '⛈️' },
    99: { description: 'Thunderstorm with heavy hail', emoji: '⛈️' }
  }
  return (
    weatherMap[wheaterCode] || {
      description: 'Unknown',
      emoji: '🤷🏼'
    }
  )
}

export const formatWeatherData = (dateString) => {
  if (!dateString) return { date: '', time: '' }

  const dateObj = new Date(dateString)

  const date = dateObj.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  const time = dateObj.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return { date, time }
}
