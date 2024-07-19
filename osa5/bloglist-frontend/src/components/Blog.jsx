import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'

const Blog = ({ blog, setBlogs, setNotification, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    await blogService.updateBlog(blog.id, { title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      author: blog.author })
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.title}`)) {
      await blogService.deleteBlog(blog.id)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setNotification(`${blog.title} by ${blog.title} removed`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    }
  }

  const [showAllInfo, setShowAllInfo] = useState(false)


  if (showAllInfo) {
    return (
      <div style={blogStyle}>
        Title: {blog.title} <button onClick={() => setShowAllInfo(false)}>Hide</button><br/>
        URL: {blog.url}<br/>
        Likes: {blog.likes} <button onClick={handleLike}>Like</button><br/>
        Author: {blog.author}<br/>
        {(blog.user.username === user.username) && <button onClick={handleDelete}>Remove</button>}
      </div>
    )
  }
  else {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={() => setShowAllInfo(true)}>View</button><br/>
      </div>
    )
  }
}
export default Blog