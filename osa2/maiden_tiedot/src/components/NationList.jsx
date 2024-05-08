import NationData from './NationData'
import { useState } from 'react'


const NationList = ({nationsToShow}) => {
    const [selectedNation, setSelectedNation] = useState(null)

    const handleShowButton = (nation) => {
        setSelectedNation(nation)
    }

    const handleBackButton = () => {
        setSelectedNation(null)
    }

    if (selectedNation) {
        return (
            <div>
                <button onClick={handleBackButton}>Back</button>
                <NationData nation={selectedNation}/>
            </div>
        )
    }

    if (nationsToShow.length > 10) {
        return <p>Too many matches, specify another filter.</p>
    }

    else if (nationsToShow.length === 1) {
        return (
            <div>
                <NationData nation={nationsToShow[0]}/>
            </div>
        )

    }
    else {
        return (
            <ul style={{listStyleType: 'none', padding: 0}}>
                {nationsToShow.map((nation, index) => (
                <li key={index}>
                    {nation}
                    <button onClick={() => handleShowButton(nation)}>Show</button>
                </li>
                ))}
            </ul>
        )
    }
}

export default NationList