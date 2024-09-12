const Recommendations = ({ show, user, books }) => {

    if (!show) {
        return null
    }

    if (user) {
        const favoriteGenre = user.favoriteGenre
    
    return (
        <div>
        <h2>Recommendations</h2>
        <p>Books in your favorite genre <strong>{favoriteGenre}</strong></p>
        <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.filter(b => b.genres.includes(favoriteGenre)).map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>))}
        </tbody>
      </table>
        

        </div>
    )
    }
    
    return null
}

export default Recommendations