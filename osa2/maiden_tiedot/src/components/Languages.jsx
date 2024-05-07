const Languages = ({data}) => {
    return (
        <ul>
            {Object.entries(data).map(([key,value]) => (
            <li key={key}>{value}</li>))}
        </ul>
    )
}

export default Languages