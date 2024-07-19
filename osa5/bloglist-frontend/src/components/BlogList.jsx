import Blog from './Blog'

const blogList = ({ blogs, setBlogs, user }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <div data-testid='bloglist'>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user}/>
      )}
    </div>
  )
}

export default blogList