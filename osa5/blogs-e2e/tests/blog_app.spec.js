const { test, expect, beforeEach, describe } = require('@playwright/test')

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
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
      await expect(page.getByText('Wrong username or password')).toBeHidden()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('wrongpassword')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Matti Luukkainen logged in')).toBeHidden()
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'Login' }).click()
    })
  
    test.only('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'New blog' }).click()
      await page.getByTestId('title').fill('An Awesome Blog Title')
      await page.getByTestId('author').fill('C. Author')
      await page.getByTestId('url').fill('www.awesomeblog.com')
      await page.getByRole('button', { name: 'Create' }).click()

      await expect(page.getByTestId('bloglist').getByText('An Awesome Blog Title').nth(1)).toBeVisible()
      await expect(page.getByText('An Awesome Blog Title').nth(1)).toBeVisible()


    })

    describe('When new blog is created', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'New blog' }).click()
        await page.getByTestId('title').fill('An Awesome Blog Title')
        await page.getByTestId('author').fill('C. Author')
        await page.getByTestId('url').fill('www.awesomeblog.com')
        await page.getByRole('button', { name: 'Create' }).click()
      })

      test('Blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'View' }).click()
        await expect(page.getByText('Likes: 0')).toBeVisible()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('Likes: 1')).toBeVisible()
      })

      /*test.only('Blog can be deleted', async ({ page }) => {
        await page.getByRole('button', { name: 'View' }).click()
        await page.getByRole('button', { name: 'Remove' }).click()
        
    

        await expect(page.getByText('An Awesome Blog Title').nth(1)).not.toBeVisible()
        await expect(page.getByText('C. Author')).not.toBeVisible()
        await expect(page.getByText('www.awesomeblog.com')).not.toBeVisible()


      })*/

    })

  })

})

