import Blog from './Blog'

const blogList = ({ blogs, setBlogs, user, setNotification }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} setNotification={setNotification}/>
      )}
    </div>
  )
}

export default blogList