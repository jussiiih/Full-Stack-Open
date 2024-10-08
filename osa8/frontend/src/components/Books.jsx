import { useState } from "react"

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const removeDuplicates = array => array.filter((item, index) => array.indexOf(item) === index)

  const books = props.books || []
  let genreList = books.map(book => book.genres)
  genreList = genreList.flat()
  genreList = removeDuplicates(genreList)


  const [filter, setFilter] = useState(null)
  const [allGenres, setAllGenres] = useState(true)
  const [filterChoosed, setFilterChoosed] = useState(null)
  const [showFilter, setShowFilter] = useState(false)

  const genreButtons = genreList.map(genre => <button key={genre} onClick={()=> {
    setFilter(genre);
    setAllGenres(false);
    setFilterChoosed(genre)
    setShowFilter(true)
    }}>{genre}</button>)

  const genresVisible = allGenres
    ?  books.map((a) => (
      <tr key={a.title}>
        <td>{a.title}</td>
        <td>{a.author.name}</td>
        <td>{a.published}</td>
      </tr>))
    : books.filter(b => b.genres.includes(filter))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>))

  
  const filterInfo = showFilter
    ? <p>in genre <strong>{filterChoosed}</strong></p>
    : null

  return (
    <div>
      <h2>books</h2>
      {filterInfo}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genresVisible}
        </tbody>
      </table>
      {genreButtons}<button onClick={() => {setAllGenres(true); setShowFilter(false)}}>all genres</button>
    </div>
  )
}

export default Books
