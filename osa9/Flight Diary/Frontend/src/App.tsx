import DiaryEntries from "./Components/DiaryEntries"
import Title from "./Components/Title";
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

  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() =>{
    entryService.getAll()
    .then(entries => {
      setEntries(entries)
    })
  }, [])
  
  return (
    <div>
      <Title/>
      <DiaryEntries entries={entries}/>
    </div>
  );
};

export default App;