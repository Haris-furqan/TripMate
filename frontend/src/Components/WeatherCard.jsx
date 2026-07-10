// components/WeatherCard.jsx
import useWeather from '../hooks/useWeather'
import Loader from './Loader'

const WeatherCard = ({ lat, lon }) => {
  const { weather, loading, error } = useWeather(lat, lon)

  if (loading) return <Loader />
  if (error) return <p className='text-red-400 text-sm'>Weather unavailable</p>

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-3'>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className='w-16 h-16'
        />
        <div>
          <p className='text-4xl font-bold text-blue-500'>{Math.round(weather.main.temp)}°C</p>
          <p className='text-gray-500 dark:text-gray-400 capitalize'>{weather.weather[0].description}</p>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300 mt-2'>
        <p>💧 Humidity: {weather.main.humidity}%</p>
        <p>💨 Wind: {Math.round(weather.wind.speed)} m/s</p>
        <p>🌡️ Feels like: {Math.round(weather.main.feels_like)}°C</p>
        <p>☁️ Clouds: {weather.clouds.all}%</p>
      </div>
    </div>
  )
}

export default WeatherCard