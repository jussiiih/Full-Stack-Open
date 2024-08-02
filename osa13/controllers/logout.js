const router = require('express').Router()
const ActiveSession = require('../models/active_session')

router.delete('/api/logout', async (req, res) => {
    const existingSession = await ActiveSession.findOne({ where: {user_id: req.body.id} })

    if (existingSession) {
        await ActiveSession.destroy({ where: {user_id: req.body.id} })
        res.status(200).send({ message: 'Logout successful' })
    }
    else {
        res.status(400).send({ message: 'No active sessions'})
    }
})

module.exports = router