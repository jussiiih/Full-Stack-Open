const router = require('express').Router()
require('express-async-errors')
const { Blog } = require('../models')
const { sequelize } = require('../models/blog')


router.get('/api/authors', async (req, res) => {
    const authors = await Blog.findAll(
        {
            group: 'author',
            attributes: [
                'author',
                [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'],
                [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
            ],
            order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']]
            
        
        }
    )
    res.json(authors)
})

module.exports = router