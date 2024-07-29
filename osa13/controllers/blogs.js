const router = require('express').Router()

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
        res.status(404).end()
    }
})

router.post('/api/blogs', async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body)
        res.json(newBlog)
    }
    catch (error) {
        return res.status(400).json({ error })
    }
})

router.delete('/api/blogs/:id', async (req, res) => {
    try {
        const blogToBeDeleted = await Blog.findByPk(req.params.id)
        if (blogToBeDeleted) {
            await blogToBeDeleted.destroy()
            res.json(blogToBeDeleted)}
        res.status(204).end()   
    }
    catch (error) {
        return res.status(400).json({ error })
    }
})

router.put('/api/blogs/:id', async (req, res) => {
    const blogToBeUpdated = await Blog.findByPk(req.params.id)
    if (blogToBeUpdated) {
        blogToBeUpdated.likes = req.body.likes
        await blogToBeUpdated.save()
        res.json(blogToBeUpdated)
    }
    else {
        res.status(404).end()
    }


})

module.exports = router