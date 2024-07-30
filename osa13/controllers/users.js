const router = require('express').Router()

const { Blog } = require('../models')
const User = require('../models/user')

router.get('/api/users', async ( req, res) => {
    console.log(User)
    const users = await User.findAll({
        include: {
            model: Blog 
        }
    })
    res.json(users)
})


router.post('/api/users', async (req, res, next) => {
    console.log(req.body)
    try {
        const newUser = await User.create(req.body)
        res.json(newUser)
    }
    catch(error) {
        next(error)
    }
})

router.put('/api/users/:username', async (req, res) => {
    const users = await User.findAll()
    const user = users.find(user=>user.username === req.params.username)
    user.name = req.body.name
    user.save()
    res.json(user)
})

module.exports = router