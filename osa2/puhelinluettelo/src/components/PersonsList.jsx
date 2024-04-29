const PersonsList = (props) => {
  
  const handleDeleteClick = (person) => {
    const isConfirmed = window.confirm (`Delete ${person.name} ?`)
    if (isConfirmed === true) {
      props.removePerson(person)
    }
  }  
  
  return (
    <ul style ={{listStyleType: 'none', padding: 0 }}>
        {props.personsToShow.map(person =>
        <li key={person.name}>{person.name} {person.number}
          <button onClick={() => handleDeleteClick(person) }>
            Delete
          </button>
        </li>
        )}
    </ul>
    )
}

export default PersonsList