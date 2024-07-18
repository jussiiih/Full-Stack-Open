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

})

// Tee testit kirjautumiselle. Testaa sekä onnistunut että epäonnistunut kirjautuminen.
// Luo testejä varten käyttäjä beforeEach-lohkossa.

