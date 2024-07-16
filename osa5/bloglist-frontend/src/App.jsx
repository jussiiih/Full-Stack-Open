import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import BlogList from './components/BlogList'
//import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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
      
      setUser(user)
      setUsername('')
      setPassword('')
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
  }



  return (
    <div>
      {errorMessage && <ErrorMessage errorMessage={errorMessage}/>}
      {!user && <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>}
      {user && <BlogList user={user} blogs={blogs} handleLogout={handleLogout}/>}
    </div>
  )
}

export default App