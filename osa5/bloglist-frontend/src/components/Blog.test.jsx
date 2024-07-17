import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'This is a title for Blog',
  author: 'A. Author',
  url: 'www.authorblog.com',
  likes: 10
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

