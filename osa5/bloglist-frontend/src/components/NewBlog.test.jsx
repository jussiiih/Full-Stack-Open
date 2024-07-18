import { render, screen } from '@testing-library/react'
import NewBlog from './NewBlog'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'

vi.mock ('../services/blogs')

test('form calls callback function with right data', async () => {

  const userAction = userEvent.setup()

  const setBlogs = vi.fn()
  const setNotification = vi.fn()
  const setErrorMessage = vi.fn()
  const user = { username: 'testuser' }

  const handleNewBlog = vi.fn()

  blogService.newBlog.mockResolvedValue({
    title: 'Great Blog Title',
    author: 'B. Author',
    url: 'www.bauthorblog.com',
  })

  blogService.getAll.mockResolvedValue([
    {
      title: 'Great Blog Title',
      author: 'B. Author',
      url: 'www.bauthorblog.com',
      user: { username: 'testuser' }
    }
  ])

  render(<NewBlog setBlogs={setBlogs} user={user} setNotification={setNotification} setErrorMessage={setErrorMessage}
  />)

  const titleInput = screen.getByPlaceholderText('Write Blog Title here')
  const authorInput = screen.getByPlaceholderText('Write Blog Author here')
  const urlInput = screen.getByPlaceholderText('Write Blog URL here')

  const submitButton = screen.getByText('Create')

  await userAction.type(titleInput, 'Great Blog Title')
  await userAction.type(authorInput, 'B. Author')
  await userAction.type(urlInput, 'www.bauthorblog.com')
  await userAction.click(submitButton)

  expect(blogService.getAll).toHaveBeenCalled(1)
  expect(setBlogs).toHaveBeenCalledWith ([{
    title: 'Great Blog Title',
    author: 'B. Author',
    url: 'www.bauthorblog.com',
    user: { username: 'testuser' }
  }
  ])
})