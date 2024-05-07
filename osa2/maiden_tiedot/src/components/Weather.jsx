import axios from 'axios'
import { useEffect, useState } from 'react'
import WeatherIcons from './WeatherIcons'

const Weather = ({capital_lat, capital_long}) => {
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        const baseUrl1 = 'https://api.open-meteo.com/v1/forecast?latitude='
        const baseUrl2 = '&longitude='
        const baseUrl3 = '&current=temperature_2m,is_day,precipitation,rain,snowfall,cloud_cover,wind_speed_10m'
        const url = `${baseUrl1}${capital_lat}${baseUrl2}${capital_long}${baseUrl3}`

        axios.get(url)
            .then(response =>
            setWeatherData(response.data))
        
    }, [capital_lat, capital_long] 
)
    
    if (weatherData) {
        return (
            <div>
                <p>Temperature {weatherData.current.temperature_2m} Celcius</p>
                <WeatherIcons day={weatherData.current.is_day} precipitation={weatherData.current.precipitation}
                cloud_cover={weatherData.current.cloud_cover} snowfall={weatherData.current.snowfall}/>
                <p>Wind {weatherData.current.wind_speed_10m} m/s</p>   
            </div>
        )
    }

}

export default Weather
