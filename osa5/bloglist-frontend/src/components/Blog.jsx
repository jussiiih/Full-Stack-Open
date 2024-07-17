import { useState } from "react"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginbottom: 5
  }
  
  const [showAllInfo, setShowAllInfo] = useState(false)
  if (showAllInfo) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={() => setShowAllInfo(false)}>Hide</button><br/>
        {blog.url}<br/>
        {blog.likes} <button onClick={() => null}>Like</button><br/>
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