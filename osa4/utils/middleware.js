const logger = require('./logger')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }
    else {
        request.token = null
    }
    next ()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected "username" to be unique' })
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: 'token missing or invalid' })
    }

    next(error)
}

module.exports = {
    errorHandler,
    tokenExtractor
}