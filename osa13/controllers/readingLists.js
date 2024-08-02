const router = require('express').Router()
const { ReadingList } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/api/readinglists', async (req, res) => {
    const newReading = await ReadingList.create(req.body)
    res.json(newReading)
})

router.post('/api/readinglists/:id', tokenExtractor, async (req, res) => {
    
    const readingToBeUpdated = await ReadingList.findByPk(req.params.id)
    readingToBeUpdated.read = req.body.read
    readingToBeUpdated.save()
    res.json(readingToBeUpdated)
})

module.exports = router