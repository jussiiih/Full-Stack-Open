const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

test('content type is JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('right number of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 0)
})

after(async () => {
    await mongoose.connection.close()
})
