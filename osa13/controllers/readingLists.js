const router = require('express').Router()
const { ReadingList } = require('../models')

router.post('/api/readinglists', async (req, res) => {
    const newReading = await ReadingList.create(req.body)
    res.json(newReading)
})

module.exports = router