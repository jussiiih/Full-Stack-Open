interface AddNewEntryProps {
    addEntry: (event: React.SyntheticEvent) => void;
    newDate: string;
    newWeather: string;
    newVisibility: string;
    newComment: string;
    setNewDate: (value: string) => void;
    setNewWeather: (value: string) => void;
    setNewVisibility: (value: string) => void;
    setNewComment: (value: string) => void;
}

const AddNewEntry = (
    {addEntry,
    newDate,
    newWeather,
    newVisibility,
    newComment,
    setNewDate,
    setNewWeather,
    setNewVisibility,
    setNewComment}:AddNewEntryProps,
    
): JSX.Element => {
    return (
        <form onSubmit={addEntry}>
            <div>
                Date <input type="date" value={newDate} onChange={(event) => setNewDate(event.target.value)}/>
            </div>
            <div>
                Visibility
                <label htmlFor="great"> Great</label>
                <input type="radio" id="great" value="great" checked={newVisibility === "great"} onChange={(event) => setNewVisibility(event.target.value)}/>
                <label htmlFor="good">Good</label>
                <input type="radio" id="good" value="good" checked={newVisibility === "good"} onChange={(event) => setNewVisibility(event.target.value)}/>
                <label htmlFor="ok">OK</label>
                <input type="radio" id="ok" value="ok" checked={newVisibility === "ok"} onChange={(event) => setNewVisibility(event.target.value)}/>
                <label htmlFor="poor">Poor</label>
                <input type="radio" id="poor" value="poor" checked={newVisibility === "poor"} onChange={(event) => setNewVisibility(event.target.value)}/>
            </div>

            <div>
                Weather
                <label htmlFor="sunny"> Sunny</label>
                <input type="radio" id="sunny" value="sunny" checked={newWeather === "sunny"} onChange={(event) => setNewWeather(event.target.value)}/>
                <label htmlFor="rainy">Rainy</label>
                <input type="radio" id="rainy" value="rainy" checked={newWeather === "rainy"} onChange={(event) => setNewWeather(event.target.value)}/>
                <label htmlFor="cloudy">Cloudy</label>
                <input type="radio" id="cloudy" value="cloudy" checked={newWeather === "cloudy"} onChange={(event) => setNewWeather(event.target.value)}/>
                <label htmlFor="stormy">Stormy</label>
                <input type="radio" id="stormy" value="stormy" checked={newWeather === "stormy"} onChange={(event) => setNewWeather(event.target.value)}/>
                <label htmlFor="windy">Windy</label>
                <input type="radio" id="windy" value="windy" checked={newWeather === "windy"} onChange={(event) => setNewWeather(event.target.value)}/>
            </div>
            <div>
                Comment <input value={newComment} onChange={(event) => setNewComment(event.target.value)}/>
            </div>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddNewEntry;