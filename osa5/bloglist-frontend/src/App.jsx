import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs.filter(blog => blog.user.username === user.username))
      )
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    
    <div>
    <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
          <div>
            Username
            <input type='text' value={username} name="username" onChange={({target}) => setUsername(target.value)}
          />
          </div>
          <div>
            Password
            <input type='text' value={password} name="password" onChange={({target}) => setPassword(target.value)}
          />
          </div>
          <div>
            <button type='submit'>Login</button>
          </div>
        </form>
    </div>

  )

  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
  </div>
  )

  return (

    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {!user && loginForm()}
      {user && blogList()}
    </div>
  )
}

export default App