const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async ( request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id:1 })
    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    try {
        const { username, name, password } = request.body
        if (request.body.password === '') {
            return response.status(400).json ({ error: 'password is required' })
        }
        else if (request.body.password.length < 3) {
            return response.status(400).json ({ error: 'minimum length of password is 3' })
        }
        else {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(password, saltRounds)

            const user = new User({
                username,
                name,
                passwordHash
            })

            const savedUser = await user.save()

            response.status(201).json(savedUser)
        }



    } catch (exception) {
        next(exception)
    }
})


module.exports = usersRouter