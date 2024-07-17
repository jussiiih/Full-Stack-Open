import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import NewBlog from './components/NewBlog'
import LoggedUser from './components/LoggedUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlogVisible, setNewBlogVisible] = useState(null)

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs.filter(blog => blog.user.username === user.username))
      )
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification('Login successful')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser('')
    window.localStorage.clear()
    setNotification('Logged out')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: newBlogVisible ? '' : 'none' }


  return (
    <div>
      <div>
        {notification && <Notification notification={notification}/>}
        {errorMessage && <ErrorMessage errorMessage={errorMessage}/>}
        {!user && <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>}
        {user && <LoggedUser user={user} handleLogout={handleLogout}/>}
      </div>

      <div>
        <div style={hideWhenVisible}>
          {user && <button onClick={() => setNewBlogVisible(true)}>New blog</button>}
        </div>
        <div style={showWhenVisible}>
          {user && <NewBlog setBlogs={setBlogs} user={user} setNotification={setNotification} setErrorMessage={setErrorMessage}/>}
        </div>
        <div style={showWhenVisible}>
          {user && <button onClick={() => setNewBlogVisible(false)}>Cancel</button>}
        </div>
      </div>

      <div>
        <br/>
        {user && <BlogList blogs={blogs} setBlogs={setBlogs} user={user}/>}
      </div>

    </div>
  )
}

export default App