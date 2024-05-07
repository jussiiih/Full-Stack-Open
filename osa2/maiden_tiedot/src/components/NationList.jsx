import NationData from './NationData'

const NationList = ({nationsToShow}) => {
    if (nationsToShow.length > 10) {
        return <p>Too many matches, specify another filter.</p>
    }

    else if (nationsToShow.length === 1) {
        return (
            <div>
                <NationData nation ={nationsToShow[0]}/>
            </div>
        )

    }
    else {
        return (
            <ul style={{listStyleType: 'none', padding: 0}}>
                {nationsToShow.map((nation, index) => (
                <li key={index}>
                    {nation}
                </li>
                ))}
            </ul>
        )
    }
}

export default NationList