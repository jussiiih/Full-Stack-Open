import { useState } from 'react'

const Authors = (props) => {
  const [name, setName ]= useState('')
  const [setBornTo, setSetBornTo] = useState('')
  
  
  if (!props.show) {
    return null
  }
  const authors = props.authors

  const submit = async (event) => {
    event.preventDefault()
    
    await props.editAuthor({ variables: { name, setBornTo: Number(setBornTo) } });
    setName('')
    setSetBornTo('')

  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        Name <input
          type="text"
          value={name}
          onChange={({ target }) => setName(target.value)}/>
        Year <input
          type="text"
          value={setBornTo}
          onChange={({ target }) => setSetBornTo(target.value)}/>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  )
}

export default Authors
