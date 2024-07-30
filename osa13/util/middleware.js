const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'SequelizeValidationError') {
        return res.status(400).send({ error: error.errors.map(e => e.message) })
    }
    if (error.status === 400) {
        return res.status(400).send({ error: 'id is not in database'})
    }
    else if (error.status === 404) {
        return res.status(404).send({ error: 'id is not in database'})
    }
    else if (error.status === 500) {
        return res.status(500).send({ error: 'ValidationError'})
    }
    next(error)
}

module.exports = { errorHandler }