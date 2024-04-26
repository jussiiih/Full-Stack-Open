import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:3002/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const phonebookObject = {
      name: newName, number: newNumber
    }
    
    if (persons.some (person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(phonebookObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (event.target.value !== '') {
      setShowAll(false)
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter = {newFilter} onChange={handleFilterChange}/>
      <PersonForm addName ={addName} newName = {newName} newNumber = {newNumber} handleNameChange ={handleNameChange} handleNumberChange ={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul style ={{listStyleType: 'none', padding: 0 }}>
        {personsToShow.map(person =>
        <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
      
  )

}

export default App