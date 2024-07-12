const { test, after, beforeEach, describe } = require('node:test')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')


const api = supertest(app)

describe('when there is one user at the start', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const hashedPassword = await bcrypt.hash('salasana', 10)
        const user = new User({
            username: 'initialusername',
            name: 'Initial Name',
            passwordHash: hashedPassword
        })
        await user.save()
    })

    test('adding new username works', async () => {
        const response1 = await User.find({})
        const users_in_db_start = response1.map(user => user.toJSON())

        const newUser = {
            username: 'karo',
            name: 'Karoliina',
            password: 'salasana3',
        }

        await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)

        const response2 = await User.find({})
        const users_in_db_end = response2.map(user => user.toJSON())

        assert.strictEqual(users_in_db_start.length, users_in_db_end.length - 1)

        const usernames = users_in_db_end.map(user => user.username)
        assert(usernames.includes(newUser.username))
    })
    test('username must be unique', async () => {
        const response1 = await User.find({})
        const users_in_db_start = response1.map(user => user.toJSON())

        const newUser = {
            username: 'initialusername',
            name: 'Second User',
            password: 'salasana3'
        }

        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        const response2 = await User.find({})
        const users_in_db_end = response2.map(user => user.toJSON())

        assert(result.body.error.includes('expected "username" to be unique'))
        assert.strictEqual(users_in_db_start.length, users_in_db_end.length)
    })
})

describe('when database is empty', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('username is required', async () => {
        const response1 = await User.find({})
        const users_in_db_start = response1.map(user => user.toJSON())

        const newUser = {
            username: '',
            name: 'Karoliina',
            password: 'salasana3',
        }

        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

        const response2 = await User.find({})
        const users_in_db_end = response2.map(user => user.toJSON())
        assert(result.body.error.includes('Path `username` is required'))
        assert.strictEqual(users_in_db_start.length, users_in_db_end.length)
    })

    test('username minimum lenght is 3', async () => {
        const response1 = await User.find({})
        const users_in_db_start = response1.map(user => user.toJSON())

        const newUser = {
            username: 'Ka',
            name: 'Karoliina',
            password: 'salasana3',
        }

        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

        const response2 = await User.find({})
        const users_in_db_end = response2.map(user => user.toJSON())
        assert(result.body.error.includes('is shorter than the minimum allowed length'))
        assert.strictEqual(users_in_db_start.length, users_in_db_end.length)
    })

    test('password is required', async () => {
        const response1 = await User.find({})
        const users_in_db_start = response1.map(user => user.toJSON())

        const newUser = {
            username: 'Karo',
            name: 'Karoliina',
            password: '',
        }

        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

        const response2 = await User.find({})
        const users_in_db_end = response2.map(user => user.toJSON())
        assert(result.body.error.includes('password is required'))
        assert.strictEqual(users_in_db_start.length, users_in_db_end.length)
    })

    test('password minimum lenght is 3', async () => {
        const response1 = await User.find({})
        const users_in_db_start = response1.map(user => user.toJSON())

        const newUser = {
            username: 'Karo',
            name: 'Karoliina',
            password: 'ss',
        }

        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

        const response2 = await User.find({})
        const users_in_db_end = response2.map(user => user.toJSON())
        assert(result.body.error.includes('minimum length of password is'))
        assert.strictEqual(users_in_db_start.length, users_in_db_end.length)
    })

})

after(async () => {
    await mongoose.connection.close()
})