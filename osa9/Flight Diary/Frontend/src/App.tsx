import DiaryEntries from "./Components/DiaryEntries"
import Title from "./Components/Title";
import AddNewEntry from "./Components/AddNewEntry";
import entryService from "./Services/entries"
import { useState, useEffect } from "react";


export interface DiaryEntry {
  id: number
  date: string,
  weather: string,
  visibility: string,
  comment: string,
}

const App = () => {


  const [newDate, setNewDate] = useState('')
  const [newWeather, setNewWeather] = useState('')
  const [newVisibility, setNewVisibility] = useState('')
  const [newComment, setNewComment] = useState('')

  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() =>{
    entryService.getAll()
    .then(entries => {
      setEntries(entries)
    })
  }, [])

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newEntry: DiaryEntry = {
      id: entries.length + 1,
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    }

    entryService
    .addEntry(newEntry)
    .then(entry => {
      setEntries(entries.concat(entry))
      setNewDate('')
      setNewVisibility('')
      setNewWeather('')
      setNewComment('')
    })
  }
  
  return (
    <div>
      <Title/>
      <AddNewEntry
        addEntry = {addEntry}
        newDate={newDate}
        newVisibility={newVisibility}
        newWeather={newWeather}
        newComment={newComment}
        setNewDate={setNewDate}
        setNewWeather={setNewWeather}
        setNewVisibility={setNewVisibility}
        setNewComment={setNewComment}
      />
      <DiaryEntries entries={entries}/>
    </div>
  );
};

export default App;