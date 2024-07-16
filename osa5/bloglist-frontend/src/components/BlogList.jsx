import Blog from './Blog'

const blogList = ({user, blogs, handleLogout}) => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in 
        <button type='submit' onClick={handleLogout}>Logout</button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
  </div>
  )

export default blogList