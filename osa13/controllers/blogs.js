const router = require('express').Router()
require('express-async-errors')
const { Blog } = require('../models/index')

router.get('/api/blogs', async(req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.get('/api/blogs/:id', async (req, res) => {
    console.log(`Fetching blog with id: ${req.params.id}`) // Added log for debugging
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        res.json(blog)
    }
    else {
        const error = new Error('Blog not found')
        error.status = 404
        throw error
    }
})

router.post('/api/blogs', async (req, res, next) => {
    try {
        const newBlog = await Blog.create(req.body)
        res.json(newBlog)
    }
    catch(error) {
        next(error)
    }
})

router.delete('/api/blogs/:id', async (req, res, next) => {
    try {
        const blogToBeDeleted = await Blog.findByPk(req.params.id)
        if (blogToBeDeleted) {
            await blogToBeDeleted.destroy()
            res.status(204).end()    
        }
        else {
            const error = new Error('Blog not found')
            error.status = 404
            throw error
        }
        
    }
    catch(error) {
        next(error)
    }
})

router.put('/api/blogs/:id', async (req, res, next) => {
    try {
            const blogToBeUpdated = await Blog.findByPk(req.params.id)
            if (!req.body.likes) {
                const error = new Error('Likes not in request')
                error.status = 404
                throw error
            }
            if (blogToBeUpdated) {
            blogToBeUpdated.likes = req.body.likes
            await blogToBeUpdated.save()
            res.json(blogToBeUpdated)
        }
        else {
            const error = new Error('Blog not found')
            error.status = 404
            throw error
        }
    }
    catch(error) {
        next(error)
    }


})

module.exports = router