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
};

module.exports = { errorHandler };
