import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import { gql, useQuery, useMutation, useApolloClient } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
        id
      }
      genres
    }
  }
`


const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int, $author: String!, $genres: [String]) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      author {
        name
        id
      }
      published  
      genres
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name
    setBornTo: $setBornTo
  ) {
    name
    born 
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
    }
  }
`


const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const authorQuery = useQuery(ALL_AUTHORS)
  const booksQuery = useQuery(ALL_BOOKS)
  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ]
  })
  const[editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query:ALL_AUTHORS }]
  })

  
  if (authorQuery.loading || booksQuery.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  const setLoginButton = token
    ? <button onClick={logout}>logout</button>
    : <button onClick={() => setPage("login")}>login</button> 
  
  const addButtonVisible = token
    ? <button onClick={() => setPage("add")}>add book</button>
    : null
    

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {addButtonVisible}
        {setLoginButton}
      </div>

      <Authors show={page === "authors"} authors={authorQuery.data.allAuthors} editAuthor={editAuthor} />

      <Books show={page === "books"} books={booksQuery.data.allBooks} />

      <NewBook show={page === "add"} addBook={addBook} />

      <LoginForm show={page === "login"} setToken={setToken} LOGIN={LOGIN} />
    </div>
  );
};

export default App;
