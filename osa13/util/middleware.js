const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            details: error.errors.map(e => e.message)
        })
    }

    if (error.name === 'SequelizeDatabaseError') {
        return res.status(500).json({
            error: 'Database Error',
            details: error.message
        })
    }

    if (error.status) {
        return res.status(error.status).json({
            error: error.message || 'An error occurred'
        })
    }

    return res.status(500).json({
        error: 'Internal Server Error',
        details: error.message || 'An unexpected error occurred'
    })
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = authorization.substring(7)
        console.log(`Token received: ${token}`)
        try {
            req.decodedToken = jwt.verify(token, SECRET)
            console.log(`Decoded token: ${JSON.stringify(req.decodedToken)}`)
        } catch (error) {
            console.error(`Token verification error: ${error.message}`)
            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}


module.exports = { errorHandler, tokenExtractor }
