/*
Tee testi, joka varmistaa, että sovellus näyttää oletusarvoisesti kirjautumislomakkeen.
Testin beforeEach-alustuslohkon tulee nollata tietokannan tilanne esim. materiaalissa näytetyllä tavalla.
 */

const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    // ...
  })
})