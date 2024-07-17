import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const handleLike = async () => {
    await blogService.updateBlog(blog.id, {title: blog.title,
                url: blog.url,
                likes: blog.likes + 1,
                author: blog.author})
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs.filter(blog => blog.user.username === user.username))
  }

  const [showAllInfo, setShowAllInfo] = useState(false)
  if (showAllInfo) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={() => setShowAllInfo(false)}>Hide</button><br/>
        {blog.url}<br/>
        Likes: {blog.likes} <button onClick={handleLike}>Like</button><br/>
        {blog.author}<br/>
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