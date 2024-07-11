const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const lodash = require('lodash')

const api = supertest(app)


const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

const newBlog = {
    title: 'This is a blog',
    author: 'Blog Author',
    url: 'https://blogwebsite.com/',
    likes: 100
}

const newBlogWithoutLikes = {
    title: 'This is a blog without likes',
    author: 'Nolikes Author',
    url: 'https://nolikesblogwebsite.com/'
}

const data_to_be_updated = {
    title: 'Updated Blog',
    author: 'Updated Author',
    url: 'https://updatedblogwebsite.com/',
    likes: 1000
}

const newBlogWithoutTitle = {
    author: 'Blog Author',
    url: 'https://blogwebsite.com/',
    likes: 100
}

const newBlogWithoutUrl = {
    title: 'This is a blog',
    author: 'Blog Author',
    likes: 100
}

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('content type is JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('right number of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('every blog has key "id"', async () => {
    const response = await api.get('/api/blogs')
    const blogs_with_id = lodash.filter(response.body, (blog) => 'id' in blog).length
    assert.strictEqual(blogs_with_id, initialBlogs.length)
})

test('HTTP POST adds one blog', async () => {
    await api.post('/api/blogs').send(newBlog)
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length + 1)
})

test('HTTP POST has same keys', async () => {
    await api.post('/api/blogs').send(newBlog)
    const response = await api.get('/api/blogs')
    assert.deepStrictEqual(lodash.keys(response.body[0]), lodash.keys(response.body[(response.body.length)-1]))
})

test('HTTP POST without likes gets 0 likes', async () => {
    await api.post('/api/blogs').send(newBlogWithoutLikes)
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body[(response.body.length)-1].likes, 0)
})

test('HTTP POST without title is responded by 400 Bad Request ', async () => {
    const response = await api.post('/api/blogs').send(newBlogWithoutTitle)
    assert.strictEqual(response.statusCode, 400)
})

test('HTTP POST without URL is responded by 400 Bad Request ', async () => {
    const response = await api.post('/api/blogs').send(newBlogWithoutUrl)
    assert.strictEqual(response.statusCode, 400)
})

test('HTTP DELETE deletes on blog ', async () => {
    const response1 = await api.get('/api/blogs')
    const last_id = response1.body[response1.body.length-1].id
    await api.delete(`/api/blogs/${last_id}`)

    const response2 = await api.get('/api/blogs')
    assert.strictEqual(response2.body.length, initialBlogs.length - 1)
})

test('after HTTP DELETE deleted id does not exist ', async () => {
    const response1 = await api.get('/api/blogs')
    const last_id = response1.body[response1.body.length-1].id
    await api.delete(`/api/blogs/${last_id}`)

    const response2 = await api.get('/api/blogs')
    assert.deepStrictEqual(response2.body.map((blog) => blog.id), response1.body.map((blog) => blog.id).slice(0, -1))
})

test('HTTP UPDATE works', async () => {
    const response1 = await api.get('/api/blogs')
    const response1_body = response1.body
    response1_body[0].title = data_to_be_updated.title
    response1_body[0].author = data_to_be_updated.author
    response1_body[0].url = data_to_be_updated.url
    response1_body[0].likes = data_to_be_updated.likes

    const response2 = await api.get('/api/blogs')
    const id= response2.body[0].id
    await api.put(`/api/blogs/${id}`).send(data_to_be_updated)
    const response4 = await api.get('/api/blogs')
    const response4_body = response4.body

    assert.deepStrictEqual(response1_body, response4_body)
})

after(async () => {
    await mongoose.connection.close()
})
