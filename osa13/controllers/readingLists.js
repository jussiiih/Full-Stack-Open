const router = require('express').Router()
const { ReadingList, User, ActiveSession } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/api/readinglists', tokenExtractor, async (req, res) => {
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

    const newReading = await ReadingList.create(req.body)
    res.json(newReading)
})

router.post('/api/readinglists/:id', tokenExtractor, async (req, res) => {
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
    
    const readingToBeUpdated = await ReadingList.findByPk(req.params.id)
    readingToBeUpdated.read = req.body.read
    readingToBeUpdated.save()
    res.json(readingToBeUpdated)
})

module.exports = router