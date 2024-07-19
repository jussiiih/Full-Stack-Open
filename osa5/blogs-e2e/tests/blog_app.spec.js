const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, addNewBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const headerLocator = await page.getByText('Log in to application')
    const usernameLocator = await page.getByText('Username:')
    const passwordLocator = await page.getByText('Password:')
    const loginButtonLocator = await page.getByText('Login')

    await expect(headerLocator).toBeVisible()
    await expect(usernameLocator).toBeVisible()
    await expect(passwordLocator).toBeVisible()
    await expect(loginButtonLocator).toBeVisible()

  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'mluukkai', 'salainen')

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
      await expect(page.getByText('Wrong username or password')).toBeHidden()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'mluukkai', 'wrongpassword')

      await expect(page.getByText('Matti Luukkainen logged in')).toBeHidden()
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'mluukkai', 'salainen')
    })
  
    test('a new blog can be added', async ({ page }) => {
      addNewBlog(page, 'An Awesome Blog Title', 'C. Author', 'www.awesomeblog.com')

      await expect(page.getByText('An Awesome Blog Title').nth(1)).toBeVisible()


    })

    describe('When new blog is created', () => {
      beforeEach(async ({ page }) => {
        addNewBlog(page, 'An Awesome Blog Title', 'C. Author', 'www.awesomeblog.com')

      })

      test('Blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'View' }).click()
        await expect(page.getByText('Likes: 0')).toBeVisible()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('Likes: 1')).toBeVisible()
      })

      test('Blog can be deleted', async ({ page }) => {
        await page.getByRole('button', { name: 'View' }).click()
        
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'Remove' }).click()
        
        await expect(page.getByText('An Awesome Blog Title').nth(1)).not.toBeVisible()
        await expect(page.getByText('C. Author')).not.toBeVisible()
        await expect(page.getByText('www.awesomeblog.com')).not.toBeVisible()
      })

      test('Only the user that added a blog can see Remove button', async ({ page, request }) => {
        const removeButton = page.getByRole('button', { name: 'Remove' })
        const viewButton = page.getByRole('button', { name: 'View' })
        
        await viewButton.click()
        await expect(removeButton).toBeVisible()
        await page.getByRole('button', { name: 'Logout' }).click()

        await request.post('http://localhost:3001/api/users', {
          data: {
            name: 'Another User',
            username: 'another',
            password: 'password'
          }
        })

        await login(page, 'another', 'password')

        await addNewBlog (page, 'Another Blog', 'D. Author', 'www.anotherblog.com')

        await viewButton.nth(0).click()
        await expect(removeButton).not.toBeVisible()
        await page.getByRole('button', { name: 'Hide' }).click()

        await viewButton.nth(1).click()
        await expect(removeButton).toBeVisible()
      })   
      })
    })
  })

