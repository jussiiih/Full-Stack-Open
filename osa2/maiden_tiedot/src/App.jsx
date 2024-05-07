import { useEffect, useState } from 'react'
import axios from 'axios'
import NationList from './components/NationList'
import nationService from './services/nations.js'
import Filter from './components/Filter.jsx'

const App = () => {

  const [nations, setNations] = useState([])

  useEffect(() => {
    nationService.getAll()
      .then(nations => {
        setNations(nations)
      })
  }, [])


  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const nationsToShow = nations.filter(nation => nation.toLowerCase().includes(newFilter.toLowerCase()))
  

  return (
    <div>
      <Filter newFilter ={newFilter} onChange={handleFilterChange}/>
      <NationList nationsToShow={nationsToShow}/>
    </div>
  )

}

export default App