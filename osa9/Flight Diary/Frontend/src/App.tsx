import DiaryEntries from "./Components/DiaryEntries"
import Title from "./Components/Title";
import AddNewEntry from "./Components/AddNewEntry";
import entryService from "./Services/entries"
import ErrorMessage from "./Components/ErrorMessage";
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
  const [message, setMessage] = useState('')

  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() =>{
    entryService.getAll()
    .then(entries => {
      setEntries(entries)
    })
  }, [])

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newEntry: DiaryEntry = {
      id: entries.length + 1,
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    }

    try {
        const addedEntry = await entryService.addEntry(newEntry)
        setEntries(entries.concat(addedEntry))
        setNewDate('')
        setNewVisibility('')
        setNewWeather('')
        setNewComment('')
      }
    catch (error) {
      if (error instanceof Error) {
        setMessage(error.message.replace("Something went wrong. ", ""))
        setTimeout(() =>  {
        setMessage('')},
          5000
        )

      }

    }
  }
  
  return (
    <div>
      <ErrorMessage message={message}/>
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
      <Title/>
      <DiaryEntries entries={entries}/>
    </div>
  );
};

export default App;