import Blog from './Blog'

const blogList = ({ blogs }) => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
  </div>
  )

export default blogList