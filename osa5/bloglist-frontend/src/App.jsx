import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import BlogList from './components/BlogList'
//import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import NewBlog from './components/NewBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const newBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url,
      user
    }

    blogService.newBlog(blogObject)
  }

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

  const handleNewBlog = async (event) => {
    event.preventDefault();
    if (!title || !author || !url) {
      setErrorMessage('Title, Author and URL are required.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }
    
    const blogObject = {
      title,
      author,
      url
    }
    await blogService.newBlog(blogObject);
    const updatedBlogs = await blogService.getAll();
    setBlogs(updatedBlogs.filter(blog => blog.user.username === user.username));
    setTitle('');
    setAuthor('');
    setUrl('');
  }



  return (
    <div>
      <div>
        {errorMessage && <ErrorMessage errorMessage={errorMessage}/>}
        {!user && <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>}
        {user && <BlogList user={user} blogs={blogs} handleLogout={handleLogout}/>}
      </div>
      <div>
        {user && <NewBlog title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} handleNewBlog={handleNewBlog}/>}
      </div>
    </div>
  )
}

export default App