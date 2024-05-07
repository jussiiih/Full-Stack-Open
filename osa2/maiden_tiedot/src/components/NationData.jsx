import { useEffect, useState } from 'react'
import nationService from '../services/nations'
import Languages from './Languages'
import Weather from './Weather'



const NationData = ({nation}) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        nationService.getNationData(nation)
        .then(response => {
            setData(response)
        }
        )

    }, []
)


if (data !== null) {
    return (
        <div>
            <h1>{data.name.common}</h1>
            <p>Capital {data.capital[0]}</p>
            <p>Area {data.area}</p>
            <p><b>Languages</b></p>
            <Languages data={data.languages}/>
            <img src={data.flags.png} alt={data.flags.alt} width="200"/>
            <p><b>Weather in {data.capital[0]}</b></p>
            <Weather capital_lat={data.capitalInfo.latlng[0]} capital_long={data.capitalInfo.latlng[1]}/>
            

        </div>
    )
}
}

export default NationData