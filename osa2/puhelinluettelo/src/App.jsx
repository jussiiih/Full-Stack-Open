import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
    .getAll()
    .then(persons => {
      setPersons(persons)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const phonebookObject = {
      name: newName, number: newNumber
    }
    
    personService
    .getAll()
    .then(persons => {
    const names = persons
    if (names.some (person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      personService
      .add(phonebookObject)
      .then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
    })}})
  } 

  const removePerson = (personToBeRemoved) => {
    personService.remove(personToBeRemoved)
    .then(() => {
      setPersons(persons.filter(person => person.id !== personToBeRemoved.id))
    }
  )
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
      
      <h3>Numbers</h3>
        <PersonsList personsToShow={personsToShow} removePerson={removePerson}/>
    </div>
      
  )

}

export default App