const router = require('express').Router()
const ActiveSession = require('../models/active_session')
const { tokenExtractor } = require('../util/middleware')

router.delete('/api/logout', tokenExtractor, async (req, res) => {
    const token = req.get('authorization').substring(7);
    const existingSession = await ActiveSession.findOne({ where: { token } });

    if (existingSession) {
        existingSession.is_active = false;
        await existingSession.save();
        res.status(200).send({ message: 'Logout successful' });
    } else {
        res.status(400).send({ message: 'No active sessions' });
    }
})

module.exports = router