const router = require('express').Router()
require('express-async-errors')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { Blog, User, ActiveSession, ReadingList } = require('../models')
const { Op } = require('sequelize')

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        try {
            const token = authorization.substring(7);
            const activeSession = await ActiveSession.findOne({ where: { token, is_active: true } });
    
            if (!activeSession) {
                return res.status(401).json({ error: 'Token is invalid or expired' });
            }
            req.decodedToken = jwt.verify(token, SECRET)
        }
        catch (error) {
            console.log(error)
            return res.status(401).json({ error: 'token invalid'})
        }
    } else {
        return res.status(401).json({error: 'token missing'})
    }
    next()
}


router.get('/api/blogs', async (req, res) => {
    

    const whereClause = req.query.search
        ? {[Op.or]: [
                { title: { [Op.iLike]: `%${req.query.search}%` } },
                { author: { [Op.iLike]: `%${req.query.search}%` } }
            ]
        }
        :  {}

    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name']
        },
        where: whereClause,
        order: [
            ['likes', 'DESC']]
        
    })
    res.json(blogs)
})

router.get('/api/blogs/:id', async (req, res) => {
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

router.post('/api/blogs', tokenExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        if (user.disabled === true) {
            return res.status(401).json({
                error: 'User disabled'
            })
        }
        const userSession = await ActiveSession.findOne({ where: { user_id: user.id, is_active: true } });
        if (!userSession) {
            return res.status(401).json({ error: 'No active session' });
        }


        const newBlog = await Blog.create({...req.body, userId: user.id, date: new Date()})
        res.json(newBlog)
    }
    catch(error) {
        next(error)
    }
})

router.delete('/api/blogs/:id', tokenExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        if (user.disabled === true) {
            return res.status(401).json({
                error: 'User disabled'
            })
        }
        const userSession = await ActiveSession.findOne({ where: { user_id: user.id, is_active: true } });
        if (!userSession) {
            return res.status(401).json({ error: 'No active session' });
        }
        
        const blogToBeDeleted = await Blog.findByPk(req.params.id)
        if (!blogToBeDeleted) {
            const error = new Error('Blog not found')
            error.status = 404
            throw error}
        if (blogToBeDeleted.userId !== req.decodedToken.id) {
            return res.status(401).json({ error: 'user not authorized to delete this blog' })
        }
        
        await ReadingList.destroy({ where: { blogId: req.params.id } })
        await blogToBeDeleted.destroy()
        res.status(204).end()
    }
    catch(error) {
        next(error)
    }
})

router.put('/api/blogs/:id', tokenExtractor, async (req, res, next) => {
    try {
            const blogToBeUpdated = await Blog.findByPk(req.params.id)

            const user = await User.findByPk(req.decodedToken.id)
            if (user.disabled === true) {
                return res.status(401).json({
                    error: 'User disabled'
                })
            }
            const userSession = await ActiveSession.findOne({ where: { user_id: user.id, is_active: true } });
            if (!userSession) {
                return res.status(401).json({ error: 'No active session' });
            }
    

            if (!req.body.likes) {
                const error = new Error('Likes not in request')
                error.status = 404
                throw error
            }
            if (blogToBeUpdated) {
            blogToBeUpdated.likes = req.body.likes
            blogToBeUpdated.updated_at = new Date()
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