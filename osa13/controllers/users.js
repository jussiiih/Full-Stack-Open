const router = require('express').Router()

const { User, Blog, ReadingList } = require('../models')

router.get('/api/users', async ( req, res) => {
    console.log(User)
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ['userId'] }
        }
    })
    res.json(users)
})

router.get('/api/users/:id', async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ['name', 'username'],
        include: {
          model: ReadingList,
          as: 'readingLists',
          include: {
            model: Blog,
            attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
          }
        }
      });
  
      if (user) {
        const formattedResponse = {
          name: user.name,
          username: user.username,
          readings: user.readingLists.map(readingList => ({
            id: readingList.blog.id,
            url: readingList.blog.url,
            title: readingList.blog.title,
            author: readingList.blog.author,
            likes: readingList.blog.likes,
            year: readingList.blog.year
          }))
        };
        res.json(formattedResponse);
      } else {
        res.status(404).send({ error: 'User not found' });
      }
    } catch (error) {
      next(error);
    }
  });
  


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
    user.updated_at = new Date()
    user.save()
    res.json(user)
})

module.exports = router