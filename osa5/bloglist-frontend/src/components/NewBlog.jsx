import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlog = ({ setBlogs, user, setNotification, setErrorMessage }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
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
    await blogService.newBlog(blogObject)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs.filter(blog => blog.user.username === user.username))
    setTitle('')
    setAuthor('')
    setUrl('')
    setNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
                    Title:
          <input type='text' value={title} name="title" onChange={({ target }) => setTitle(target.value)} placeholder='Write Blog Title here'/>
        </div>
        <div>
                    Author:
          <input type='text' value={author} name="author" onChange={({ target }) => setAuthor(target.value)} placeholder='Write Blog Author here'/>
        </div>
        <div>
                    URL:
          <input type='text' value={url} name="url" onChange={({ target }) => setUrl(target.value)} placeholder='Write Blog URL here'/>
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}
export default NewBlog