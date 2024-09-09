import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { gql, useQuery, useMutation } from '@apollo/client'


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
      author
      published
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
      author
      published  
      genres
    }
  }
`


const App = () => {
  const [page, setPage] = useState("authors");

  const authorQuery = useQuery(ALL_AUTHORS)
  const booksQuery = useQuery(ALL_BOOKS)
  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ]
  })
  
  if (authorQuery.loading || booksQuery.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} authors={authorQuery.data.allAuthors} />

      <Books show={page === "books"} books={booksQuery.data.allBooks} />

      <NewBook show={page === "add"} addBook={addBook} />
    </div>
  );
};

export default App;
