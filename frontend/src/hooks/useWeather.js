// hooks/useWeather.js
import { useState, useEffect } from 'react'

const useWeather = (lat, lon) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const weatherAPI = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (!lat || !lon) return

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPI}&units=metric`
        )
        if (!res.ok) throw new Error('Weather fetch failed')
        const data = await res.json()
        setWeather(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [lat, lon])

  return { weather, loading, error }
}

export default useWeather