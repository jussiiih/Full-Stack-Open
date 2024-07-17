import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title', () => {
  const blog = {
    title: 'This is a a title for Blog',
    author: 'A. Author',
    url: 'www.authorblog.com',
    likes: 10
  }

  render(<Blog blog={blog}/>)
  const titleElement = screen.getByText('This is a a title for Blog')
  const authorElement = screen.queryByText('A. Author')
  const urlElement = screen.queryByText('www.authorblog.com')
  const likesElement = screen.queryByText('10')

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeNull()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()

})

