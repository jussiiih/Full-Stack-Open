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
                Date <input value={newDate} onChange={(event) => setNewDate(event.target.value)}/>
            </div>
            <div>
                Visibility <input value={newVisibility} onChange={(event) => setNewVisibility(event.target.value)}/>
            </div>
            <div>
                Weather <input value={newWeather} onChange={(event) => setNewWeather(event.target.value)}/>
            </div>
            <div>
                Comment <input value={newComment} onChange={(event) => setNewComment(event.target.value)}/>
            </div>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddNewEntry;