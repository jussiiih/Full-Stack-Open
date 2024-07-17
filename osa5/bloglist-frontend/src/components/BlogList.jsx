import Blog from './Blog'

const blogList = ({ blogs, setBlogs, user }) => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user}/>
      )}
  </div>
  )

export default blogList