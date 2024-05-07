

const WeatherIcons = ({day, precipitation,cloud_cover,snowfall}) => {
    
    const url_start = 'https://openweathermap.org/img/wn/'
    let code = ''
    const url_end = '@2x.png'

    if (snowfall > 0) {
        code = '13d'
    }    
    else if (precipitation > 0) {
        code= '09d'
    }
    else if (cloud_cover > 75) {
        code ='04d'
    }
    else if (cloud_cover > 25 && day === 1 ) {
        code ='02d'
    }
    else if (day === 0) {
        code ='01n'
    }
    else {
        code ='01d'
    }

    const url = `${url_start}${code}${url_end}`

    return (
        <div>
            <img src ={url}/>
        </div>
    )
    
}

export default WeatherIcons