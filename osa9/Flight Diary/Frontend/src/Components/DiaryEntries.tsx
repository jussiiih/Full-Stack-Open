import { DiaryEntry } from "../App";

const DiaryEntries = ({entries}: {entries: DiaryEntry[]}): JSX.Element => {
    return (
            <div >
                {entries.map(entry =>
                    <div key={entry.id}>
                        <h3>{entry.date}</h3>
                        <p>Visibility: {entry.visibility}</p>
                        <p>Weather: {entry.weather}</p>
                    </div>
                )}
            </div>

    )
}

export default DiaryEntries;