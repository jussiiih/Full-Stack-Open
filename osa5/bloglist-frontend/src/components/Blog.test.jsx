import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'


const blog = {
  title: 'This is a title for Blog',
  author: 'A. Author',
  url: 'www.authorblog.com',
  likes: 10,
  user: { usernname: 'testuser' }
}

vi.mock ('../services/blogs')

const user = {
  username: 'testuser'
}

test('app renders title as default, not author, url, or likes', () => {

  render(<Blog blog={blog}/>)
  const titleElement = screen.getByText('This is a title for Blog')
  const authorElement = screen.queryByText('A. Author')
  const urlElement = screen.queryByText('www.authorblog.com')
  const likesElement = screen.queryByText('10')

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeNull()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test('when view button is cliked, app renders title, author, url, and likes', async () => {
  const mockHandler = vi.fn()

  render(<Blog blog={blog} setShowAllInfo={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const titleElement = screen.findByText('This is a title for Blog')
  const authorElement = screen.findByText('A. Author')
  const urlElement = screen.findByText('www.authorblog.com')
  const likesElement = screen.findByText('10')

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
})

test('when like button is clicked twice event handler function is called twice', async () => {

  blogService.updateBlog.mockResolvedValue({
    ...blog,
    likes: blog.likes + 1
  })

  blogService.getAll.mockResolvedValue([{
    ...blog,
    likes: blog.likes + 1
  }])

  const setBlogs = vi.fn()

  render(<Blog blog={blog} setBlogs={setBlogs} user={user} />)

  const userAction = userEvent.setup()
  const viewButton = screen.getByText('View')
  await userAction.click(viewButton)
  const likeButton = screen.getByText('Like')
  await userAction.click(likeButton)
  await userAction.click(likeButton)

  expect(blogService.updateBlog).toHaveBeenCalledTimes(2)
})